const Institution = require('../src/institution');
const Instructor = require('../src/instructor');
const CourseOffering = require('../src/course-offering')
const Course = require('../src/course')

describe('Instructor-Tests', () => {
    let instructor;
    let institution;

    beforeEach(() => {
        // setup
        instructor = new Instructor()
        institution = new Institution()
    });

    test('GivenAValidInstructor_Spring2025_ListCourses', () => {
        // Arrange
        const testInstitution = new Institution('Quinnipiac University', 'qu.edu')
        const sqaInstructor = new Instructor('Cena', 'John', testInstitution, '1/1/2024', 'jcena')

        // Act
        testInstitution.hire_instructor(sqaInstructor)

        // Assert
        const course = new Course("CSC",111,"Data Structures and Abstraction",3)
        const course2 = new Course("CSC",215,"Algorithms",3)
        const course3 = new Course("CSC",350,"Artificial Intelligence",3)
        const courseOffering = new CourseOffering(course,3,2024,"Spring")
        const courseOffering2 = new CourseOffering(course2,3,2024,"Fall")
        const courseOffering3 = new CourseOffering(course3,3,2025,"Spring")
        institution.add_course(course)
        institution.add_course(course2)
        institution.add_course(course3)
        institution.add_course_offering(courseOffering)
        institution.add_course_offering(courseOffering2)
        institution.add_course_offering(courseOffering3)
        institution.assign_instructor(sqaInstructor, course.name, "CSC", 111, 3, 2024, "Spring")
        institution.assign_instructor(sqaInstructor, course2.name, "CSC", 215, 3, 2024, "Fall")
        institution.assign_instructor(sqaInstructor, course3.name, "CSC", 350, 3, 2025, "Spring")

        let courses = [courseOffering3];
        expect(sqaInstructor.list_courses(2025,"Spring").toString()).toBe(courses.toString());
    });
    
    test('GivenAValidInstructor_2024_ListCourses', () => {
        // Arrange
        const testInstitution = new Institution('Quinnipiac University', 'qu.edu')
        const sqaInstructor = new Instructor('Cena', 'John', testInstitution, '1/1/2024', 'jcena')

        // Act
        testInstitution.hire_instructor(sqaInstructor)

        // Assert
        const course = new Course("CSC",111,"Data Structures and Abstraction",3)
        const course2 = new Course("CSC",215,"Algorithms",3)
        const course3 = new Course("CSC",350,"Artificial Intelligence",3)
        const courseOffering = new CourseOffering(course,3,2024,"Spring")
        const courseOffering2 = new CourseOffering(course2,3,2024,"Fall")
        const courseOffering3 = new CourseOffering(course3,3,2025,"Spring")
        institution.add_course(course)
        institution.add_course(course2)
        institution.add_course(course3)
        institution.add_course_offering(courseOffering)
        institution.add_course_offering(courseOffering2)
        institution.add_course_offering(courseOffering3)
        institution.assign_instructor(sqaInstructor, course.name, "CSC", 111, 3, 2024, "Spring")
        institution.assign_instructor(sqaInstructor, course2.name, "CSC", 215, 3, 2024, "Fall")
        institution.assign_instructor(sqaInstructor, course3.name, "CSC", 350, 3, 2025, "Spring")

        let courses2024 = [courseOffering, courseOffering2];
        expect(sqaInstructor.list_courses(2024).toString()).toBe(courses2024.toString());
    });
    
    test('GivenAValidInstructor_Spring_ListCourses', () => {
        // Arrange
        const testInstitution = new Institution('Quinnipiac University', 'qu.edu')
        const sqaInstructor = new Instructor('Cena', 'John', testInstitution, '1/1/2024', 'jcena')

        // Act
        testInstitution.hire_instructor(sqaInstructor)

        // Assert
        const course = new Course("CSC",111,"Data Structures and Abstraction",3)
        const course2 = new Course("CSC",215,"Algorithms",3)
        const course3 = new Course("CSC",350,"Artificial Intelligence",3)
        const courseOffering = new CourseOffering(course,3,2024,"Spring")
        const courseOffering2 = new CourseOffering(course2,3,2024,"Fall")
        const courseOffering3 = new CourseOffering(course3,3,2025,"Spring")
        institution.add_course(course)
        institution.add_course(course2)
        institution.add_course(course3)
        institution.add_course_offering(courseOffering)
        institution.add_course_offering(courseOffering2)
        institution.add_course_offering(courseOffering3)
        institution.assign_instructor(sqaInstructor, course.name, "CSC", 111, 3, 2024, "Spring")
        institution.assign_instructor(sqaInstructor, course2.name, "CSC", 215, 3, 2024, "Fall")
        institution.assign_instructor(sqaInstructor, course3.name, "CSC", 350, 3, 2025, "Spring")

        let coursesSpring = [courseOffering, courseOffering3];
        expect(sqaInstructor.list_courses(null,"Spring").toString()).toBe(coursesSpring.toString());
    });
    
    test('GivenAValidInstructor_AllSemesters_ListCourses', () => {
        // Arrange
        const testInstitution = new Institution('Quinnipiac University', 'qu.edu')
        const sqaInstructor = new Instructor('Cena', 'John', testInstitution, '1/1/2024', 'jcena')

        // Act
        testInstitution.hire_instructor(sqaInstructor)

        // Assert
        const course = new Course("CSC",111,"Data Structures and Abstraction",3)
        const course2 = new Course("CSC",215,"Algorithms",3)
        const course3 = new Course("CSC",350,"Artificial Intelligence",3)
        const courseOffering = new CourseOffering(course,3,2024,"Spring")
        const courseOffering2 = new CourseOffering(course2,3,2024,"Fall")
        const courseOffering3 = new CourseOffering(course3,3,2025,"Spring")
        institution.add_course(course)
        institution.add_course(course2)
        institution.add_course(course3)
        institution.add_course_offering(courseOffering)
        institution.add_course_offering(courseOffering2)
        institution.add_course_offering(courseOffering3)
        institution.assign_instructor(sqaInstructor, course.name, "CSC", 111, 3, 2024, "Spring")
        institution.assign_instructor(sqaInstructor, course2.name, "CSC", 215, 3, 2024, "Fall")
        institution.assign_instructor(sqaInstructor, course3.name, "CSC", 350, 3, 2025, "Spring")

        let courses = [];
        courses.push(courseOffering)
        courses.push(courseOffering2)
        courses.push(courseOffering3)
        expect(sqaInstructor.list_courses().toString()).toBe(courses.toString());
    });
    
    test('GivenNewInstructor_AllConditionsMet_ReturnsNewInstructor', () => {
        // Arrange
        // Before Each
        const testInstitution = new Institution('Quinnipiac University', 'qu.edu')
        const testInstructor = new Instructor('Doe', 'John', testInstitution, '1/1/1970', 'jdoe')

        // Act
        
        // Assert
        expect(testInstructor.toString()).toBe("\nInstructor Name: John Doe\nSchool: Quinnipiac University\nDOB: Jan 1, 1970\nUsername: jdoe\n");
    });
});