"use client";
import { AreaGraph } from './area-graph';
import { BarGraph } from './bar-graph';
import { PieGraph } from './pie-graph';
import PageContainer from '@/components/page-container';
import { RecentSales } from './recent-sales';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loader from '@/components/Loader';

export default function OverViewPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [insights, setInsights] = useState<any[]>([]);
  const [data, setData] = useState<any>({})
  const getData = async () => {
    setIsLoading(false)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/booking/get-insights`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ticket-master-token")}`,
        },
      })
      const data = await response.json()
      console.log(data)
      if (data.success) {
        setData(data.data)
        setInsights(data.data.insights)
      }
      else {
        toast.error(data.message)
      }
    }
    catch (error) {
      toast.error((error as Error).message || "Something wrong happend")
    }
    finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return isLoading ? <Loader /> : (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-${insights?.length}`}>

              {insights?.map((data: any, index: any) =>
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {data._id} Sales
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{data?.totalRevenue}</div>
                    <p className='text-sm font-thing'>Total Bookings: {data?.totalBookings}</p>
                  </CardContent>
                </Card>
              )
              }
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4">
                <BarGraph />
              </div>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made {data?.totalSales} sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales sales={data?.sales} />
                </CardContent>
              </Card>
              <div className="col-span-4">
                <AreaGraph />
              </div>
              <div className="col-span-4 md:col-span-3">
                <PieGraph />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
