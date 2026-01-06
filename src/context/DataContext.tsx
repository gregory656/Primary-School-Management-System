import React, { useState } from 'react';
import type { ReactNode } from 'react';
import type { Student, Teacher, Class, Subject, Attendance, Result, Fee, TimetableEntry, User, AcademicYear, Term, ImportantDay, ClassSubject } from '../types';
import { DataContext } from './dataContext';
import type { DataContextType } from './dataContext';

interface DataProviderProps {
  children: ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  // Initial data
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'Alice Johnson', grade: '5th', age: 11, email: 'alice@example.com', classId: 1, attendance: 95, feesPaid: true, gender: 'female', emergencyContact: '+1-555-1001', admissionDate: '2022-01-15', expectedLeaveDate: '2026-11-30', disciplineRecords: [{ id: 1, term: 'Term 1', rating: 4, notes: 'Excellent behavior' }, { id: 2, term: 'Term 2', rating: 5, notes: 'Outstanding conduct' }], gradeHistory: [{ id: 1, grade: '4th', year: '2022-2023', averageScore: 88 }, { id: 2, grade: '5th', year: '2023-2024', averageScore: 92 }] },
    { id: 2, name: 'Bob Smith', grade: '4th', age: 10, email: 'bob@example.com', classId: 2, attendance: 88, feesPaid: false, gender: 'male', emergencyContact: '+1-555-1002', admissionDate: '2022-02-01', expectedLeaveDate: '2027-11-30', disciplineRecords: [{ id: 3, term: 'Term 1', rating: 3, notes: 'Good behavior' }], gradeHistory: [{ id: 3, grade: '3rd', year: '2022-2023', averageScore: 82 }, { id: 4, grade: '4th', year: '2023-2024', averageScore: 85 }] },
    { id: 3, name: 'Charlie Brown', grade: '6th', age: 12, email: 'charlie@example.com', classId: 1, attendance: 92, feesPaid: true, gender: 'male', emergencyContact: '+1-555-1003', admissionDate: '2021-09-01', expectedLeaveDate: '2025-11-30', disciplineRecords: [{ id: 4, term: 'Term 1', rating: 4, notes: 'Very good' }, { id: 5, term: 'Term 2', rating: 3, notes: 'Needs improvement in focus' }], gradeHistory: [{ id: 5, grade: '5th', year: '2022-2023', averageScore: 87 }, { id: 6, grade: '6th', year: '2023-2024', averageScore: 89 }] },
    { id: 4, name: 'Diana Prince', grade: '3rd', age: 9, email: 'diana@example.com', classId: 2, attendance: 96, feesPaid: true, gender: 'female', emergencyContact: '+1-555-1004', admissionDate: '2023-01-10', expectedLeaveDate: '2028-11-30', disciplineRecords: [{ id: 6, term: 'Term 1', rating: 5, notes: 'Exemplary behavior' }], gradeHistory: [{ id: 7, grade: '3rd', year: '2023-2024', averageScore: 94 }] },
    { id: 5, name: 'Eve Wilson', grade: '5th', age: 11, email: 'eve@example.com', classId: 1, attendance: 90, feesPaid: false, gender: 'female', emergencyContact: '+1-555-1005', admissionDate: '2022-03-15', expectedLeaveDate: '2026-11-30', disciplineRecords: [{ id: 7, term: 'Term 1', rating: 4, notes: 'Good conduct' }], gradeHistory: [{ id: 8, grade: '4th', year: '2022-2023', averageScore: 86 }, { id: 9, grade: '5th', year: '2023-2024', averageScore: 88 }] },
    { id: 6, name: 'Frank Miller', grade: '2nd', age: 8, email: 'frank@example.com', classId: 3, attendance: 93, feesPaid: true, gender: 'male', emergencyContact: '+1-555-1006', admissionDate: '2023-09-01', expectedLeaveDate: '2029-11-30', disciplineRecords: [{ id: 8, term: 'Term 1', rating: 4, notes: 'Well behaved' }], gradeHistory: [{ id: 10, grade: '2nd', year: '2023-2024', averageScore: 91 }] },
    { id: 7, name: 'Grace Lee', grade: '7th', age: 13, email: 'grace@example.com', classId: 4, attendance: 89, feesPaid: true, gender: 'female', emergencyContact: '+1-555-1007', admissionDate: '2020-08-20', expectedLeaveDate: '2024-11-30', disciplineRecords: [{ id: 9, term: 'Term 1', rating: 3, notes: 'Average behavior' }, { id: 10, term: 'Term 2', rating: 4, notes: 'Improving' }], gradeHistory: [{ id: 11, grade: '6th', year: '2022-2023', averageScore: 84 }, { id: 12, grade: '7th', year: '2023-2024', averageScore: 87 }] },
    { id: 8, name: 'Henry Davis', grade: '1st', age: 7, email: 'henry@example.com', classId: 5, attendance: 97, feesPaid: false, gender: 'male', emergencyContact: '+1-555-1008', admissionDate: '2023-08-15', expectedLeaveDate: '2029-11-30', disciplineRecords: [{ id: 11, term: 'Term 1', rating: 5, notes: 'Perfect behavior' }], gradeHistory: [{ id: 13, grade: '1st', year: '2023-2024', averageScore: 95 }] },
    { id: 9, name: 'Ivy Chen', grade: '8th', age: 14, email: 'ivy@example.com', classId: 6, attendance: 85, feesPaid: true, gender: 'female', emergencyContact: '+1-555-1009', admissionDate: '2019-09-05', expectedLeaveDate: '2023-11-30', disciplineRecords: [{ id: 12, term: 'Term 1', rating: 2, notes: 'Needs attention' }, { id: 13, term: 'Term 2', rating: 3, notes: 'Some improvement' }], gradeHistory: [{ id: 14, grade: '7th', year: '2022-2023', averageScore: 78 }, { id: 15, grade: '8th', year: '2023-2024', averageScore: 81 }] },
    { id: 10, name: 'Jack Wilson', grade: '4th', age: 10, email: 'jack@example.com', classId: 2, attendance: 91, feesPaid: true, gender: 'male', emergencyContact: '+1-555-1010', admissionDate: '2022-04-01', expectedLeaveDate: '2027-11-30', disciplineRecords: [{ id: 14, term: 'Term 1', rating: 4, notes: 'Good student' }], gradeHistory: [{ id: 16, grade: '3rd', year: '2022-2023', averageScore: 89 }, { id: 17, grade: '4th', year: '2023-2024', averageScore: 90 }] },
  ]);

  const [teachers, setTeachers] = useState<Teacher[]>([
    { id: 1, name: 'Dr. Sarah Johnson', subject: 'Mathematics', email: 'sarah.johnson@school.com', phone: '+1-555-0101', role: 'headteacher', age: 45, gender: 'female', tscNo: 'TSC001', subjectCombination: 'Mathematics, Physics' },
    { id: 2, name: 'Mr. Michael Chen', subject: 'Science', email: 'michael.chen@school.com', phone: '+1-555-0102', role: 'deputy', age: 40, gender: 'male', tscNo: 'TSC002', subjectCombination: 'Chemistry, Biology' },
    { id: 3, name: 'Ms. Emily Davis', subject: 'English', email: 'emily.davis@school.com', phone: '+1-555-0103', role: 'classteacher', classId: 1, age: 35, gender: 'female', tscNo: 'TSC003', subjectCombination: 'English, Literature' },
    { id: 4, name: 'Mr. Robert Wilson', subject: 'History', email: 'robert.wilson@school.com', phone: '+1-555-0104', role: 'subjectteacher', age: 38, gender: 'male', tscNo: 'TSC004', subjectCombination: 'History, Geography' },
    { id: 5, name: 'Mrs. Lisa Brown', subject: 'Art', email: 'lisa.brown@school.com', phone: '+1-555-0105', role: 'classteacher', classId: 2, age: 42, gender: 'female', tscNo: 'TSC005', subjectCombination: 'Art, Music' },
  ]);

  const [classes, setClasses] = useState<Class[]>([
    { id: 1, name: 'Grade 5A', teacherId: 3, studentIds: [1, 3, 5], classRep: 'Alice Johnson' },
    { id: 2, name: 'Grade 4B', teacherId: 5, studentIds: [2, 4], classRep: 'Bob Smith' },
  ]);

  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, name: 'Mathematics', teacherId: 1, classIds: [1, 2] },
    { id: 2, name: 'Science', teacherId: 2, classIds: [1, 2] },
    { id: 3, name: 'English', teacherId: 3, classIds: [1] },
    { id: 4, name: 'History', teacherId: 4, classIds: [2] },
    { id: 5, name: 'Art', teacherId: 5, classIds: [1, 2] },
  ]);

  const [attendance, setAttendance] = useState<Attendance[]>([
    { id: 1, studentId: 1, date: '2024-01-15', present: true },
    { id: 2, studentId: 2, date: '2024-01-15', present: false },
    { id: 3, studentId: 3, date: '2024-01-15', present: true },
  ]);

  const [results, setResults] = useState<Result[]>([
    { id: 1, studentId: 1, subjectId: 1, score: 85, grade: 'A', term: 'Term 1' },
    { id: 2, studentId: 2, subjectId: 2, score: 78, grade: 'B', term: 'Term 1' },
  ]);

  const [fees, setFees] = useState<Fee[]>([
    { id: 1, studentId: 1, amount: 500, dueDate: '2024-02-01', paid: true },
    { id: 2, studentId: 2, amount: 500, dueDate: '2024-02-01', paid: false },
  ]);

  const [timetable, setTimetable] = useState<TimetableEntry[]>([
    { id: 1, day: 'Monday', startTime: '08:00', endTime: '09:00', subjectId: 1, teacherId: 1, classId: 1 },
    { id: 2, day: 'Monday', startTime: '09:00', endTime: '10:00', subjectId: 2, teacherId: 2, classId: 1 },
  ]);

  const [academicYear, setAcademicYearState] = useState<AcademicYear | null>(null);

  const [terms, setTerms] = useState<Term[]>([]);

  const [importantDays, setImportantDays] = useState<ImportantDay[]>([]);

  const [users] = useState<User[]>([
    { id: 1, name: 'Dr. Sarah Johnson', role: 'headteacher', username: 'head', password: 'admin123', entityId: 1 },
    { id: 2, name: 'Mr. Michael Chen', role: 'deputy', username: 'deputy', password: 'admin123', entityId: 2 },
    { id: 3, name: 'Ms. Emily Davis', role: 'classteacher', username: 'teacher1', password: 'admin123', entityId: 3 },
    { id: 4, name: 'Mr. Robert Wilson', role: 'subjectteacher', username: 'teacher2', password: 'admin123', entityId: 4 },
    { id: 5, name: 'Alice Johnson', role: 'student', username: 'student1', password: 'student123', entityId: 1 },
  ]);

  const [classSubjects, setClassSubjects] = useState<ClassSubject[]>([]);

  // CRUD methods
  const addStudent = (student: Omit<Student, 'id'>) => {
    const newId = Math.max(...students.map(s => s.id)) + 1;
    setStudents([...students, { ...student, id: newId }]);
  };

  const updateStudent = (id: number, updates: Partial<Student>) => {
    setStudents(students.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteStudent = (id: number) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const addTeacher = (teacher: Omit<Teacher, 'id'>) => {
    const newId = Math.max(...teachers.map(t => t.id)) + 1;
    setTeachers([...teachers, { ...teacher, id: newId }]);
  };

  const updateTeacher = (id: number, updates: Partial<Teacher>) => {
    setTeachers(teachers.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTeacher = (id: number) => {
    setTeachers(teachers.filter(t => t.id !== id));
  };

  const addClass = (class_: Omit<Class, 'id'>) => {
    const newId = Math.max(...classes.map(c => c.id)) + 1;
    setClasses([...classes, { ...class_, id: newId }]);
  };

  const updateClass = (id: number, updates: Partial<Class>) => {
    setClasses(classes.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteClass = (id: number) => {
    setClasses(classes.filter(c => c.id !== id));
  };

  const addSubject = (subject: Omit<Subject, 'id'>) => {
    const newId = Math.max(...subjects.map(s => s.id)) + 1;
    setSubjects([...subjects, { ...subject, id: newId }]);
  };

  const updateSubject = (id: number, updates: Partial<Subject>) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteSubject = (id: number) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const addAttendance = (attendanceRecord: Omit<Attendance, 'id'>) => {
    const newId = Math.max(...attendance.map(a => a.id)) + 1;
    setAttendance([...attendance, { ...attendanceRecord, id: newId }]);
  };

  const updateAttendance = (id: number, updates: Partial<Attendance>) => {
    setAttendance(attendance.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const deleteAttendance = (id: number) => {
    setAttendance(attendance.filter(a => a.id !== id));
  };

  const addResult = (result: Omit<Result, 'id'>) => {
    const newId = Math.max(...results.map(r => r.id)) + 1;
    setResults([...results, { ...result, id: newId }]);
  };

  const updateResult = (id: number, updates: Partial<Result>) => {
    setResults(results.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const deleteResult = (id: number) => {
    setResults(results.filter(r => r.id !== id));
  };

  const addFee = (fee: Omit<Fee, 'id'>) => {
    const newId = Math.max(...fees.map(f => f.id)) + 1;
    setFees([...fees, { ...fee, id: newId }]);
  };

  const updateFee = (id: number, updates: Partial<Fee>) => {
    setFees(fees.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const deleteFee = (id: number) => {
    setFees(fees.filter(f => f.id !== id));
  };

  const addTimetableEntry = (entry: Omit<TimetableEntry, 'id'>) => {
    const newId = Math.max(...timetable.map(t => t.id)) + 1;
    setTimetable([...timetable, { ...entry, id: newId }]);
  };

  const updateTimetableEntry = (id: number, updates: Partial<TimetableEntry>) => {
    setTimetable(timetable.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTimetableEntry = (id: number) => {
    setTimetable(timetable.filter(t => t.id !== id));
  };

  const addTerm = (term: Omit<Term, 'id'>) => {
    const newId = Math.max(...terms.map(t => t.id)) + 1;
    setTerms([...terms, { ...term, id: newId }]);
  };

  const updateTerm = (id: number, updates: Partial<Term>) => {
    setTerms(terms.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTerm = (id: number) => {
    setTerms(terms.filter(t => t.id !== id));
  };

  const addImportantDay = (day: Omit<ImportantDay, 'id'>) => {
    const newId = Math.max(...importantDays.map(d => d.id)) + 1;
    setImportantDays([...importantDays, { ...day, id: newId }]);
  };

  const updateImportantDay = (id: number, updates: Partial<ImportantDay>) => {
    setImportantDays(importantDays.map(d => d.id === id ? { ...d, ...updates } : d));
  };

  const deleteImportantDay = (id: number) => {
    setImportantDays(importantDays.filter(d => d.id !== id));
  };

  const setAcademicYear = (academicYear: AcademicYear | null) => {
    if (academicYear) {
      const newId = academicYear.id || 1;
      setAcademicYearState({ ...academicYear, id: newId });
    } else {
      setAcademicYearState(null);
    }
  };

  const value: DataContextType = {
    students,
    teachers,
    classes,
    subjects,
    attendance,
    results,
    fees,
    timetable,
    academicYear,
    terms,
    importantDays,
    users,
    classSubjects,
    setClassSubjects,
    addStudent,
    updateStudent,
    deleteStudent,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    addClass,
    updateClass,
    deleteClass,
    addSubject,
    updateSubject,
    deleteSubject,
    addAttendance,
    updateAttendance,
    deleteAttendance,
    addResult,
    updateResult,
    deleteResult,
    addFee,
    updateFee,
    deleteFee,
    addTimetableEntry,
    updateTimetableEntry,
    deleteTimetableEntry,
    setAcademicYear,
    addTerm,
    updateTerm,
    deleteTerm,
    addImportantDay,
    updateImportantDay,
    deleteImportantDay,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;