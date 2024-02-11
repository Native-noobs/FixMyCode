export interface Lesson {
    id: string
    lesson: number
    homework: Homework[]
}
export interface Homework {
    id: string
    title: string
    description: string
    initializeCode: string
    lessonId: string
    testCases: TestCases[]
}
export interface TestCases {
    id: string,
    input: any
    output: any
    homeworkId: string
}
export interface HomeWorkProps {
    data?: Homework;
}