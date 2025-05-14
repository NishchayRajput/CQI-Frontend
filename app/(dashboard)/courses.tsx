'use client';
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
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Courses() {
  const [professors, setProfessors] = useState<{ _id: string; Name: string }[]>([]);
  const [courses, setCourses] = useState<{ _id: string; id: string; name: string; professorId?: { Name: string }; year: string }[]>([]);
  const semesters = ['Monsoon', 'Winter', 'Summer'];

  const [formCourseCode, setFormCourseCode] = useState('');
  const [formCourseName, setFormCourseName] = useState('');
  const [formCourseProfName, setFormCourseProfName] = useState('');
  const [formYear, setFormYear] = useState('');
  const [formCourseType, setFormCourseType] = useState('');
  const [open, setOpen] = useState(false);


  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/course/list`);
      setCourses(response.data);
    }
    catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  }
  const fetchProfessors = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/professor/list`);
      setProfessors(response.data);
    } catch (error) {
      console.error('Failed to fetch professors:', error);
    }
  };
  useEffect(() => {

    fetchCourses();
    fetchProfessors();
  }, []);

  // Debugging: Log courses whenever they are updated
  useEffect(() => {
    console.log('Updated courses:', courses);
  }, [courses]);

  const handleAddCourse = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const newCourse = {
        id: formCourseCode,
        name: formCourseName,
        professorId: formCourseProfName,
        year: formYear,
        type: formCourseType.toLocaleLowerCase(),
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/course/create`, newCourse);
      console.log('Course added successfully:', response.data);

      fetchCourses();
      setOpen(false); // Close dialog on success
    } catch (error) {
      console.error('Failed to add course:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Courses</CardTitle>
            <CardDescription className="mt-2">List of all courses</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="ml-auto">Add Course</Button>
            </DialogTrigger>
            <DialogContent className="p-6 space-y-6">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">Add Course</DialogTitle>
                <DialogDescription className="text-sm text-gray-500">
                  Fill in the details below to add a new course.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-6" onSubmit={handleAddCourse}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="courseCode" className="block text-sm font-medium text-gray-700">
                      Course Code
                    </label>
                    <input
                      id="courseCode"
                      name="courseCode"
                      type="text"
                      value={formCourseCode}
                      onChange={(e) => setFormCourseCode(e.target.value)}
                      className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Enter course code"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="courseTitle" className="block text-sm font-medium text-gray-700">
                      Course Title
                    </label>
                    <input
                      id="courseTitle"
                      name="courseTitle"
                      type="text"
                      value={formCourseName}
                      onChange={(e) => setFormCourseName(e.target.value)}
                      className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Enter course title"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="professorName" className="block text-sm font-medium text-gray-700">
                      Professor Name
                    </label>
                    <select
                      id="professorName"
                      name="professorName"
                      value={formCourseProfName}
                      onChange={(e) => setFormCourseProfName(e.target.value)}
                      className="mt-3 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    >
                      <option value="">Select a professor</option>
                      {professors.map((professor) => (
                        <option key={professor._id} value={professor._id}>
                          {professor.Name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                      Year
                    </label>
                    <input
                      id="year"
                      name="year"
                      type="text"
                      value={formYear}
                      onChange={(e) => setFormYear(e.target.value)}
                      className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Enter year"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
                      Semester
                    </label>
                    <select
                      id="semester"
                      name="semester"
                      value={formCourseType}
                      onChange={(e) => setFormCourseType(e.target.value)}
                      className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    >
                      <option value="">Select a semester</option>
                      {semesters.map((semester, index) => (
                        <option key={index} value={semester}>
                          {semester}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <DialogFooter className="pt-4">
                  <Button type="submit" className="w-full">
                    Add Course
                  </Button>
                  <DialogClose asChild>
                    <Button type="button" className="w-full" onClick={() => setOpen(false)}>
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-x-[1vw] gap-y-[1vh]">
        {[...courses].reverse().map((course, index) => (
          <CoursesCard
            key={index}
            courseCode={course.id}
            courseTitle={course.name}
            professorName={course.professorId?.Name || ''}
            year={course.year}
            id={course._id}
          />
        ))}
      </CardContent>
    </Card>
  );
}