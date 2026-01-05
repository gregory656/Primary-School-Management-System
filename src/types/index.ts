// Data types
export interface Student {
  id: number;
  name: string;
  grade: string;
  age: number;
  email: string;
  classId: number;
  attendance: number;
  feesPaid: boolean;
  gender: 'male' | 'female';
  emergencyContact: string;
  admissionDate: string;
  expectedLeaveDate: string;
  disciplineRecords: DisciplineRecord[];
  gradeHistory: GradeRecord[];
}

export interface Teacher {
  id: number;
  name: string;
  subject: string;
  email: string;
  phone: string;
  role: 'headteacher' | 'deputy' | 'classteacher' | 'subjectteacher';
  classId?: number;
  age: number;
  gender: 'male' | 'female';
  tscNo: string;
  subjectCombination: string;
}

export interface Class {
  id: number;
  name: string;
  teacherId: number;
  studentIds: number[];
  classRep: string;
}

export interface Subject {
  id: number;
  name: string;
  teacherId: number;
  classIds: number[];
}

export interface Attendance {
  id: number;
  studentId: number;
  date: string;
  present: boolean;
}

export interface Result {
  id: number;
  studentId: number;
  subjectId: number;
  score: number;
  grade: string;
  term: string;
}

export interface Fee {
  id: number;
  studentId: number;
  amount: number;
  dueDate: string;
  paid: boolean;
}

export interface TimetableEntry {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
  subjectId: number;
  teacherId: number;
  classId: number;
}

export interface User {
  id: number;
  name: string;
  role: 'headteacher' | 'deputy' | 'classteacher' | 'subjectteacher' | 'student';
  username: string;
  password: string;
  entityId: number; // ID of the corresponding student/teacher
}

export interface AcademicYear {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

export interface Term {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  academicYearId: number;
}

export interface ImportantDay {
  id: number;
  name: string;
  date: string;
  type: 'holiday' | 'event';
}
