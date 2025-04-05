const CourseOffering = require('../src/course-offering')
const Course = require('../src/course')
const Student = require('../src/student')
const Institution = require('../src/institution')

describe('Student', () => {
    let student;

    beforeEach(() => {
        student = new Student("Doe","John",{
            name: "Quinnipiac University",
            domain: "qu.edu"
        },"January 1, 1970 00:00:00","jdoe");
    })

    // create test cases
    test('GivenNewStudent_AllConditionsMet_ReturnsGPA', () => {
        const institution = new Institution('Quinnipiac University', 'qu.edu')
        const student = new Student("Doe", "John", institution, "12/30/1999", "jdoe")
        const course = new Course("CSC",111,"Data Structures and Abstraction",3)
        const courseOffering = new CourseOffering(course,3,2025,"Spring")
        let students = []
        students.push(student);
        institution.add_course(course)
        institution.add_course_offering(courseOffering)

        courseOffering.register_students(students);
        courseOffering.submit_grade(student, 'A');
        
        expect(student.gpa).toBe(0);
    })
    
    test('GivenNewStudent_AllConditionsMet_ReturnsNewStudent', () => {
        expect(student.toString()).toBe("\nStudent Name: John Doe\nSchool: Quinnipiac University\nDOB: Jan 1, 1970\nUsername: jdoe\nEmail: jdoe@qu.edu\nGPA: 0\nCredits: 0\n");
    })
    
    test('GivenNewStudent_AllConditionsMet_ListCourses', () => {
        const institution = new Institution('Quinnipiac University', 'qu.edu')
        const student = new Student("Doe", "John", institution, "12/30/1999", "jdoe")
        const course = new Course("CSC",111,"Data Structures and Abstraction",3)
        const course2 = new Course("CSC",109,"Introduction to Version Control and Collaboration",1)
        const course3 = new Course("SER",225,"Software Development",1)
        const course4 = new Course("SER",330,"Software Quality Assurance",1)
        const courseOffering3 = new CourseOffering(course3,3,2024,"Fall")
        const courseOffering4 = new CourseOffering(course4,3,2025,"Spring")
        const courseOffering = new CourseOffering(course,3,2024,"Spring")
        const courseOffering2 = new CourseOffering(course2,1,2024,"Spring")

        institution.enroll_student(student)

        institution.add_course(course3)
        institution.add_course(course4)
        institution.add_course(course)
        institution.add_course(course2)
        institution.add_course_offering(courseOffering3)
        institution.add_course_offering(courseOffering4)
        institution.add_course_offering(courseOffering)
        institution.add_course_offering(courseOffering2)

        institution.register_student_for_course(student, "Data Structures and Abstraction", "CSC", 111, 3, 2024, "Spring")
        institution.register_student_for_course(student, "Data Structures and Abstraction", "CSC", 109, 1, 2024, "Spring")
        institution.register_student_for_course(student, "Software Development", "SER", 225, 3, 2024, "Fall")
        institution.register_student_for_course(student, "Software Quality Assurance", "SER", 330, 3, 2025, "Spring")

        courseOffering.submit_grade(student,'A')
        courseOffering2.submit_grade(student,'A')
        courseOffering3.submit_grade(student,'A')
        courseOffering4.submit_grade(student,'A')

        expect(student.list_courses().toString()).toBe("")
    })
})