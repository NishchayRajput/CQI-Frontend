import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { CoursesCard } from './courses-card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Courses() {
  const courses = [
    { courseCode: 'CS201', courseTitle: 'Computer', professorName: 'Dr. ASD', year: '2025' },
    { courseCode: 'CS202', courseTitle: 'Mathematics', professorName: 'Dr. XYZ', year: '2024' },
    { courseCode: 'CS203', courseTitle: 'Physics', professorName: 'Dr. LMN', year: '2023' },
    { courseCode: 'CS204', courseTitle: 'Chemistry', professorName: 'Dr. PQR', year: '2022' },
    { courseCode: 'CS205', courseTitle: 'Biology', professorName: 'Dr. EFG', year: '2021' },
    { courseCode: 'CS206', courseTitle: 'History', professorName: 'Dr. HIJ', year: '2020' },
    { courseCode: 'CS207', courseTitle: 'Geography', professorName: 'Dr. KLM', year: '2019' },
    { courseCode: 'CS208', courseTitle: 'Economics', professorName: 'Dr. NOP', year: '2018' },
    { courseCode: 'CS209', courseTitle: 'Philosophy', professorName: 'Dr. QRS', year: '2017' },
  ];


  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Courses</CardTitle>
            <CardDescription>List of all courses</CardDescription>
          </div>
          {/* DialogTrigger wraps the button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="ml-auto">Add Course</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Course</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new course.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4">
                <div>
                  <label htmlFor="courseCode" className="block text-sm font-medium">
                    Course Code
                  </label>
                  <input
                    id="courseCode"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter course code"
                  />
                </div>
                <div>
                  <label htmlFor="courseTitle" className="block text-sm font-medium">
                    Course Title
                  </label>
                  <input
                    id="courseTitle"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter course title"
                  />
                </div>
                <div>
                  <label htmlFor="professorName" className="block text-sm font-medium">
                    Professor Name
                  </label>
                  <input
                    id="professorName"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter professor name"
                  />
                </div>
                <div>
                  <label htmlFor="year" className="block text-sm font-medium">
                    Year
                  </label>
                  <input
                    id="year"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter year"
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Add Course</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-x-[1vw] gap-y-[1vh]">
        {courses.map((course, index) => (
          <CoursesCard
            key={index}
            courseCode={course.courseCode}
            courseTitle={course.courseTitle}
            professorName={course.professorName}
            year={course.year}
          />
        ))}
      </CardContent>
    </Card>
  );
}