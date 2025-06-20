import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ListFeedback from '../../FeedbackTable';
// import Courses from '../../courses';
import Statistics from './statistics';



export default async function Feedback(
  props: {
    searchParams: Promise<{ q: string; offset: string }>;
  }
) {



  return (
    <Tabs defaultValue="feedback">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="feedback">Feedbacks</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          {/* <TabsTrigger value="draft">Draft</TabsTrigger> */}
          
        </TabsList>
       
      </div>
      <TabsContent value="feedback">
        <ListFeedback/>
      </TabsContent>
      <TabsContent value="statistics">
        <Statistics />
      </TabsContent>
    </Tabs>
  );
}
