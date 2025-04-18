import { cn } from '@/lib/utils';

type CopyrightProps = {
  className?: string;
};

const Copyright = ({ className }: CopyrightProps) => {
  return <p className={cn('', className)}>Copyright ⓒ SM Pay. All rights reserved.</p>;
};

export default Copyright;
