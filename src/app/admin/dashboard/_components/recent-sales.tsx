import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function RecentSales({ sales }: { sales: any }) {
  return (
    <div className="space-y-8">
      {
        sales?.map((sale: any, index: number) => (
          <div key={index} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>{sale?.user?.firstName[0].toUpperCase()}{sale?.user?.lastName[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{sale?.user?.firstName} {sale?.user?.lastName}</p>
              <p className="text-sm text-muted-foreground">
                {sale?.user?.email}
              </p>
            </div>
            <div className="ml-auto font-medium">{sale?.totalPrice} Pkr</div>
          </div>
        ))
      }
    </div>
  );
}
