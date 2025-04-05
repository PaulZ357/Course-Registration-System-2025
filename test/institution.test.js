const Course = require('../src/course')
const CourseOffering = require('../src/course-offering')
const Instructor = require('../src/instructor')
const Institution = require('../src/institution')
const Person = require('../src/person')
const Student = require('../src/student')

describe('Institution-Tests', () => {

    let testInstitution;
    // This will run before each test case 
    // Initialize a new calculator instance
    beforeEach(() => {
        testInstitution = new Institution('Quinnipiac University', 'qu.edu')

    });

    
    test('GivenAValidInstructor_AllConditionsMet_HiresANewInstructor', () => {

        // Arrange
        const sqaInstructor = new Instructor('Nicolini', 'Dylan', testInstitution, '1/1/2024', 'dnicolini')

        // Act
        testInstitution.hire_instructor(sqaInstructor)
        
        // Assert
        // Using the Object.Keys function we can extract an array of the keys for the
        // faculty dictionary.
        // This allows us to verify that there is 1 and only 1 value in the faculty list
        expect(Object.keys(testInstitution.facultyList).length).toBe(1)

        // Another option to verify that the value matching the dictionary
        // is equal
        // The behavior you are validating here is that the method adds the right person
        expect(Object.keys(testInstitution.facultyList)).toStrictEqual(['dnicolini'])

    })

    test('GivenAValidInstructor_VerifiesDuplicateInstructor_DoesNotAddDuplicate', () => {

        // Arrange
        const sqaInstructor = new Instructor('Nicolini', 'Dylan', testInstitution, '1/1/2024', 'dnicolini')

        // Act
        testInstitution.hire_instructor(sqaInstructor)

        // This behavior is a bit sneaky because it simply logs the error and doesn't throw an error
        // or report the behavior
        //  You generally cant assert against log statements - so our test expectations are the same
        // 
        testInstitution.hire_instructor(sqaInstructor)

        // Assert
        // Using the Object.Keys function we can extract an array of the keys for the
        // faculty dictionary.
        // This allows us to verify that there is 1 and only 1 value in the faculty list
        expect(Object.keys(testInstitution.facultyList).length).toBe(1)

        // Another option to verify that the value matching the dictionary
        // is equal
        // The behavior you are validating here is that the method adds the right person
        expect(Object.keys(testInstitution.facultyList)).toStrictEqual(['dnicolini'])

    })

    test('GivenAnInvalidInstructory_AttemptsToHireInstructor_ThrowsError', () => {

        // Arrange
        let testPerson = new Person('lastName', 'firstName', 'test school', '1/1/2024', 'student_username', 'affiliation')


        // Combines the act and assertion to validate the error was thrown
        expect(() => testInstitution.hire_instructor(testPerson)).toThrowError(TypeError)
    })
    
    test('courseIsInvalid', () => {

        // Arrange

        // Act

        // Assert
        expect(() => testInstitution.add_course("CSC 111")).toThrowError(TypeError)
    })

    test('GivenNewStudentEnrolled_AllConditionsMet_SucessfullyAdded', () => {

        // Arrange
        const student = new Student("Doe", "John", testInstitution, "12/30/1999", "jdoe")

        // Act

        // Assert
        expect(testInstitution.enroll_student(student)).toBe();
    })

    // i tried to get a test case with enroll student being called twice but jest treats it as if one was added.

    test('GivenNewStudentEnrolled_NoArgument_ThrowsError', () => {

        // Arrange
        const student = new Student("Doe", "John", testInstitution, "12/30/1999", "jdoe")

        // Act
        testInstitution.enroll_student(student)

        // Assert
        expect(testInstitution.enroll_student).toThrowError("Only accepts student object");
    })


    test('GivenNewInstructor_AllConditionsMet_IsSuccessful', () => {
        // Arrange
        // Before Each
        const testInstructor = new Instructor('Doe', 'John', testInstitution, '1/1/1970', 'jdoe')

        // Act
        
        // Assert
        expect(testInstitution.hire_instructor(testInstructor)).toBe("Hired John Doe");
    });
    
    test('courseOfferingIsInvalid', () => {

        // Arrange

        // Act

        // Assert
        expect(() => testInstitution.add_course_offering("CSC 111-03")).toThrowError(TypeError)
    })

    test('GivenListStudents_AllConditionsMet_PrintEnrolledStudents', () => {

        // Arrange
        const student = new Student("Doe", "John", testInstitution, "12/30/1999", "jdoe")

        // Act
        testInstitution.enroll_student(student)

        // Assert
        expect(testInstitution.listStudents()).toBe(`\nEnrolled Students (${testInstitution.name})\n-------------------------------------------\nDoe, John\n`)
    })

    test('GivenCourseSchedule_NoCourses_PrintCourseSchedule', () => {
        expect(testInstitution.list_course_schedule()).toBe('No offerings currently scheduled')
    })

    test('GivenCourseSchedule_NoConditions_PrintCourseSchedule', () => {
        
        const course = new Course("CSC",111,"Data Structures and Abstraction",3)
        const courseOffering = new CourseOffering(course,3,2024,"Spring")
        testInstitution.add_course(course)
        testInstitution.add_course_offering(courseOffering)

        expect(testInstitution.list_course_schedule()).toBe('No offerings scheduled during this semester')
    })

    test('GivenCourseSchedule_AllConditions_PrintCourseSchedule', () => {
        
        const course = new Course("CSC",111,"Data Structures and Abstraction",3)
        const courseOffering = new CourseOffering(course,3,2024,"Spring")
        testInstitution.add_course(course)
        testInstitution.add_course_offering(courseOffering)

        expect(testInstitution.list_course_schedule(2024, "Spring", "CSC")).toBe()
    })

    test('GivenCourseOffering_CourseExists_Successful', () => {
        const course = new Course("CSC",111,"Data Structures and Abstraction",3)
        const courseOffering = new CourseOffering(course,3,2024,"Spring")
        testInstitution.add_course(course);
        expect(testInstitution.add_course_offering(courseOffering)).toBe()
    })
    

    test('GivenCourseOffering_EmptyCourse_Warning', () => {
        const courseOffering = new CourseOffering("",3,2024,"Spring")
        expect(testInstitution.add_course_offering(courseOffering)).toBe('Please create a course before creating course offering')
    })
    
    test('GivenCourseOffering_NoArgs_ThrowsError', () => {
        expect(testInstitution.add_course_offering).toThrowError('Only accepts course offering as argument')
    })

    test('GivenRegisterStudentForCourse_StudentNotEnrolled_Successful',() => {
        const student = new Student("Simpson", "Homer", testInstitution, "04/19/1987", "hsimpson")
        testInstitution.enroll_student(student);
        const course = new Course("CSC",111,"Data Structures and Abstraction",3)
        const courseOffering = new CourseOffering(course,3,2024,"Spring")
        testInstitution.add_course(course);
        testInstitution.add_course_offering(courseOffering)
        
        expect(testInstitution.register_student_for_course(student,"Data Structures and Abstraction","CSC",111,3,2024,"Spring")).toBe()
    })

    /*test('GivenRegisterStudentForCourse_StudentEnrolled_PrintsMessage',() => {
        const student = new Student("Simpson", "Homer", testInstitution, "04/19/1987", "hsimpson")
        testInstitution.enroll_student(student);
        const course = new Course("CSC",111,"Data Structures and Abstraction",3)
        const courseOffering = new CourseOffering(course,3,2024,"Spring")
        testInstitution.enroll_student(student)
        testInstitution.add_course(course);
        testInstitution.add_course_offering(courseOffering)

        const m1 = testInstitution.register_student_for_course(student,course.name,course.department,course.number,courseOffering.sectionNumber,courseOffering.year,courseOffering.quarter);
        
        expect(m1).toBe()
        const m2 = testInstitution.register_student_for_course(student,course.name,course.department,course.number,courseOffering.sectionNumber,courseOffering.year,courseOffering.quarter);

        expect(m2).toBe('Homer Simpson is already enrolled in this course')
    })*/

    test('GivenRegisterStudentForCourse_NoArgs_Error',() => {
        expect(testInstitution.register_student_for_course).toThrowError(TypeError)
    })
})