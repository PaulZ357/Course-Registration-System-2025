const Student = require('../src/student');

describe('Student', () => {
    let student;

    beforeEach(() => {
        student = new Student("Doe","John",{
            name: "Quinnipiac University",
            domain: "qu.edu"
        },"January 1, 1970 00:00:00","jdoe");
    })

    // create test cases
    test('To String', () => {
        expect(student.toString()).toBe("\nStudent Name: John Doe\nSchool: Quinnipiac University\nDOB: Jan 1, 1970\nUsername: jdoe\nEmail: jdoe@qu.edu\nGPA: 0\nCredits: 0\n");
    })
})