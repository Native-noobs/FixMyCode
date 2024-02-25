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
    id?: string,
    input: any | undefined
    output: any | undefined
    homeworkId?: string
}
export interface HomeWorkProps {
    data: Homework;
}
export interface resultResponse {
    output?: string
    result?: boolean
}
export interface resultRes {
    output?: string
    result?: resultResponse[]
}
export interface modalProps {
    title: string
    text: string
    isOpen: boolean
    acceptButtonText: string
    rejectButtonText: string
    onClick?: () => void
    onCancel?: () => void
}
export interface LessonModalPros {
    isOpen: boolean
    setIsOpen: () => void
    id?: string
}