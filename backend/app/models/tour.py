from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List, Literal
from datetime import datetime

# Define Literals to match your TypeScript types exactly
KigaliDistrict = Literal[
    'Nyarugenge', 'Gasabo', 'Kicukiro',
    'Nyamirambo', 'City Center', 'Kimihurura'
]

TourCategory = Literal[
    'Genocide Memorial & Historical', 'Art & Culture',
    'Urban Exploration', 'Culinary & Food', 'Nature & Hiking'
]

TourType = Literal['Group', 'Private', 'Custom']


class TourLocation(BaseModel):
    country: Literal['Rwanda'] = "Rwanda"
    city: Literal['Kigali'] = "Kigali"
    district: KigaliDistrict
    startingPoint: str


class TourDuration(BaseModel):
    value: float
    unit: Literal['hours', 'days']


class TourPrice(BaseModel):
    amount: float
    currency: Literal['RWF', 'USD']


class TourAvailability(BaseModel):
    totalSlots: int
    remainingSlots: int
    minParticipants: int


class TourAssurance(BaseModel):
    rating: float = 5.0
    reviewCount: int = 0
    recommendationTag: Optional[str] = None
    isVerified: bool = False


class TourSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: str
    title: str
    category: TourCategory
    description: str
    link: Optional[str] = None
    images: List[str] = []

    location: TourLocation
    # Swapped alias to match TS 'type'
    tour_type: TourType = Field(..., alias="type")
    duration: TourDuration
    price: TourPrice
    availability: TourAvailability

    highlights: List[str] = []
    adventureSteps: List[str] = Field(default=[], alias="adventure_steps")
    difficulty: Literal['Easy', 'Moderate', 'Strenuous'] = "Moderate"
    languages: List[Literal['English', 'Kinyarwanda',
                            'French', 'Swahili']] = ["English"]
    assurance: TourAssurance

    created_at: datetime
    updated_at: Optional[datetime] = None
