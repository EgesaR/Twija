const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className='text-sm opacity-60'>{label}</p>
    <p className='text-lg font-medium'>{value}</p>
  </div>
);
export default InfoItem;