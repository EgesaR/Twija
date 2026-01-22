from app.config.dependencies import get_supabase_client

def main():
    client = get_supabase_client()
    
    def create_timestamped():
        from datetime import datetime, timezone, timedelta
        now = datetime.now(timezone.utc)
        adjusted_time = now - timedelta(hours=2)
        return adjusted_time.isoformat().replace("+00:00", "Z")
        
    print("Creating timestamped entry:", create_timestamped())
    def fetch_all_records(columns="*", filters=None):
        """
        Fetch records from the "tours" table.
        
        Args:
            columns: Comma-separated string of columns (default: "*" for all)
            filters: Dict with column names as keys and filter values (default: None)
        """
        query = client.from_("tours").select(columns)
        
        if filters:
            for column, value in filters.items():
                query = query.eq(column, value)
        
        data = query.execute()
        print("data:", data.data)
        print("count:", data.count)
        return data
    
    fetch_all_records()  # All columns, no filters

    # Insert a new record into the "tours" table
    def create_new_record():
        new_tour = {
            "title": "New Tour",
            "description": "A description of the new tour",
            "category": "Walking",
            "price": 100.0,
            "duration": 30,
            "image_url": "http://example.com/image.jpg"
        }
        insert_response = client.from_("tours").insert(new_tour).execute()
        print("Insert response:", insert_response.data)

    #create_new_record()
    #fetch_all_records()  # Verify insertion
    
    def update_record():
        # Update an existing record in the "tours" table
        data = client.table("tours").update({
            "price": 120.0,
            "duration": 45
        }).eq("id", 1).execute()
        print("Update response:", data.data)
        
    def delete_record():
        # Delete a record from the "tours" table
        data = client.table("tours").delete().eq("id", 1).execute()
        print("Delete response:", data.data)

if __name__ == "__main__":
    main()
