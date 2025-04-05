const Person = require('../src/person');

describe('Person-Tests', () => {
    let person;

    beforeEach(() => {
        // setup
        person = new Person()
    });

    test('GivenNewPerson_AllConditionsMet_ReturnsNewPerson', () => {
        // Arrange
        // Before Each

        // Act
        const testPerson = new Person('lastName', 'firstName', 'test school', '1/1/2024', 'student_username', 'affiliation');
        
        // Assert
        expect(testPerson.toString()).toBe('\nStudent Name: firstName lastName\nSchool: undefined\nDOB: Jan 1, 2024\nUsername: student_username\naffiliation: affiliation\n');
    });
});