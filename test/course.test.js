const Course = require('../src/course')

describe('Course-Tests', () => {
    let course;

    beforeEach(() => {
        // setup
        course = new Course("CSC",111,"Data Structures and Abstraction",3)
    });
    
    test('GivenNewCourse_AllConditionsMet_ReturnsNewCourse', () => {
        expect(course.toString()).toBe('Data Structures and Abstraction, CSC 111 (3 credits)');
    })
})