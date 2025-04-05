const CourseOffering = require('../src/course-offering')
const Course = require('../src/course')
const Student = require('../src/student')
const Institution = require('../src/institution')

describe('Course-Tests', () => {
    let course;
    let courseOffering;
    
    beforeEach(() => {
        // setup
        course = new Course("CSC",111,"Data Structures and Abstraction",3)
        courseOffering = new CourseOffering(course,3,2025,"Spring")
    });

    test('GivenNewCourseOffering_AllConditionsMet_ReturnsNewCourseOffering', () => {
        expect(courseOffering.toString()).toBe('Data Structures and Abstraction, CSC 111-3 (Spring 2025)');
    })
    
    test('GivenGetStudents_AllConditionsMet_ReturnsStudents', () => {
        const quinnipiac = new Institution('Quinnipiac University', 'qu.edu')
        const john = new Student("Doe", "John", quinnipiac, "12/30/1999", "jdoe")
        const jane = new Student("Doe", "Jane", quinnipiac, "12/31/1999", "jdoe1")
        let students = []
        students.push(john);
        students.push(jane);
        courseOffering.register_students(students);
        expect(courseOffering.get_students().toString()).toBe(students.toString());
    })
    
    test('GivenSubmitGrade_AllConditionsMet_SubmitGrade', () => {
        const quinnipiac = new Institution('Quinnipiac University', 'qu.edu')
        const student = new Student("Doe", "John", quinnipiac, "12/30/1999", "jdoe")
        let students = []
        students.push(student);
        courseOffering.register_students(students);
        courseOffering.submit_grade(student, 'A');
        expect(courseOffering.get_grade(student)).toBe('A');
    })
    
    test('GivenSubmitGrade_InvalidGrade_FailsToSubmit', () => {
        const quinnipiac = new Institution('Quinnipiac University', 'qu.edu')
        const student = new Student("Doe", "John", quinnipiac, "12/30/1999", "jdoe")
        let students = []
        students.push(student);
        courseOffering.register_students(students);
        expect(courseOffering.submit_grade(student, 'E')).toBe('Please enter a valid grade');
    })
})