import { Form } from 'react-router';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Logout = () => {
  return (
    <Form method='post' action='/auth/logout'>
      <Button
        variant='ghost'
        size='sm'
        className='text-destructive hover:bg-destructive/10'
      >
        <LogOut className='w-4 h-4 mr-2' />
        Logout
      </Button>
    </Form>
  );
}

export default Logout;