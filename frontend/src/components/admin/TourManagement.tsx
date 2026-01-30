import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  MapPin,
  Clock,
  DollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import type { Tour, KigaliDistrict, TourCategory, TourType } from '@/types/tour';
import ImageUpload from './ImageUpload';

interface TourManagementProps {
  tours: Tour[];
  onRefresh: () => void;
}

const DISTRICTS: KigaliDistrict[] = [
  'Nyarugenge',
  'Gasabo',
  'Kicukiro',
  'Nyamirambo',
  'City Center',
  'Kimihurura',
];
const CATEGORIES: TourCategory[] = [
  'Genocide Memorial & Historical',
  'Art & Culture',
  'Urban Exploration',
  'Culinary & Food',
  'Nature & Hiking',
];

const TourManagement = ({ tours, onRefresh }: TourManagementProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with the nested structure from your types
  const [formData, setFormData] = useState<Partial<Tour>>({
    title: '',
    category: 'Urban Exploration',
    description: '',
    images: [],
    location: {
      country: 'Rwanda',
      city: 'Kigali',
      district: 'City Center',
      startingPoint: '',
    },
    type: 'Group',
    duration: { value: 3, unit: 'hours' },
    price: { amount: 0, currency: 'USD' },
    difficulty: 'Easy',
    assurance: { rating: 5, reviewCount: 0, isVerified: true },
  });

  const openEditDialog = (tour: Tour) => {
    setEditingTour(tour);
    setFormData(tour);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = editingTour ? `/api/tours/${editingTour.id}` : '/api/tours';
      const method = editingTour ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save tour');

      toast({ title: editingTour ? 'Tour Updated' : 'Tour Created' });
      setIsDialogOpen(false);
      onRefresh();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold text-primary'>
          Kigali Tour Catalog
        </h2>
        <Button
          onClick={() => {
            setEditingTour(null);
            setIsDialogOpen(true);
          }}
          className='rounded-full bg-[#D4AF37] hover:bg-[#C5A028]'
        >
          <Plus className='w-4 h-4 mr-2' /> Add New Experience
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>
              {editingTour ? 'Edit Experience' : 'New Experience'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Basic Info */}
            <div className='grid gap-4'>
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder='e.g., Nyamirambo Walking Tour'
              />
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            {/* Nested Location & Logistics */}
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label>District</Label>
                <Select
                  value={formData.location?.district}
                  onValueChange={(v) =>
                    setFormData({
                      ...formData,
                      location: {
                        ...formData.location!,
                        district: v as KigaliDistrict,
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DISTRICTS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Price (USD)</Label>
                <Input
                  type='number'
                  value={formData.price?.amount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: {
                        ...formData.price!,
                        amount: parseFloat(e.target.value),
                      },
                    })
                  }
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label>Duration (Value)</Label>
                <Input
                  type='number'
                  value={formData.duration?.value}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      duration: {
                        ...formData.duration!,
                        value: parseFloat(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div>
                <Label>Difficulty</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(v) =>
                    setFormData({ ...formData, difficulty: v as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Easy'>Easy</SelectItem>
                    <SelectItem value='Moderate'>Moderate</SelectItem>
                    <SelectItem value='Strenuous'>Strenuous</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <ImageUpload
              currentImageUrl={formData.images?.[0]}
              onImageUploaded={(url) =>
                setFormData({ ...formData, images: [url] })
              }
              onImageRemoved={() => setFormData({ ...formData, images: [] })}
            />

            <Button
              type='submit'
              className='w-full bg-[#D4AF37]'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Save Tour Listing'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Tour List Rendering */}
      <div className='grid gap-4'>
        {tours.map((tour) => (
          <motion.div
            key={tour.id}
            className='glass-card p-4 border rounded-xl'
          >
            <div className='flex gap-4'>
              <img
                src={tour.images[0]}
                className='w-24 h-24 rounded-lg object-cover'
                alt=''
              />
              <div className='flex-1'>
                <div className='flex justify-between'>
                  <h3 className='font-bold'>{tour.title}</h3>
                  <div className='flex gap-2'>
                    <Button
                      size='sm'
                      variant='ghost'
                      onClick={() => openEditDialog(tour)}
                    >
                      <Edit2 size={16} />
                    </Button>
                  </div>
                </div>
                <div className='flex gap-4 text-sm text-muted-foreground mt-1'>
                  <span className='flex items-center gap-1'>
                    <MapPin size={14} /> {tour.location.district}
                  </span>
                  <span className='flex items-center gap-1'>
                    <Clock size={14} /> {tour.duration.value}{' '}
                    {tour.duration.unit}
                  </span>
                  <span className='flex items-center gap-1 text-amber-600 font-semibold'>
                    ${tour.price.amount}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TourManagement;
