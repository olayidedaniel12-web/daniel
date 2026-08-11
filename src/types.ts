export interface Course {
  id: string;
  code: string;
  title: string;
  units: number;
  tma1Completed: boolean;
  tma2Completed: boolean;
  tma3Completed: boolean;
  tma1Score?: number;
  tma2Score?: number;
  tma3Score?: number;
  progressPercent: number;
  description: string;
  facilitator: string;
  facilitatorEmail: string;
  coursewareUrl: string;
  modules: {
    id: string;
    title: string;
    description: string;
    readTime: string;
    pdfSize: string;
  }[];
}

export interface TMAAssignment {
  id: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  tmaNumber: 1 | 2 | 3;
  dueDate: string;
  isUrgent: boolean; // due within 48h
  status: 'pending' | 'submitted' | 'graded';
  score?: number;
  totalQuestions: number;
  questions: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

export interface Transaction {
  id: string;
  reference: string;
  date: string;
  description: string;
  type: 'credit' | 'debit';
  amount: number;
  status: 'Successful' | 'Pending' | 'Failed';
  category: 'Wallet Funding' | 'Course Registration' | 'Exam Fee' | 'TMA Fee' | 'Portal Charge';
}

export interface ExamSchedule {
  id: string;
  courseCode: string;
  courseTitle: string;
  date: string;
  time: string;
  session: 'Morning' | 'Afternoon';
  venue: string;
  seatNumber: string;
  studyCentre: string;
}

export interface SemesterResult {
  semester: string;
  cgpa: number;
  gpa: number;
  totalUnits: number;
  courses: {
    code: string;
    title: string;
    units: number;
    tmaScore: number;
    examScore: number;
    totalScore: number;
    grade: string;
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'alert' | 'info' | 'success';
  read: boolean;
}

export interface StudentProfile {
  name: string;
  matricNumber: string;
  semester: string;
  status: string;
  cgpa: number;
  program: string;
  faculty: string;
  studyCentre: string;
  email: string;
  phone: string;
  walletBalance: number;
  photoUrl: string;
}
