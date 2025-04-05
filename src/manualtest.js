const Course = require('./course.js')
const Student = require('./student.js')
const CourseOffering = require('./course-offering.js')
const Institution = require('./institution.js')
const Instructor = require('./instructor.js')

const courseName = "Full Stack Development";
const department = "SER";
const courseNum = 341;
const sectionNumber = 1;
const year = 2025;
const quarter = "spring";

const institution = new Institution("Quinnipiac", "qu");
const instructor = new Instructor("Doe","John","Quinnipiac","1/2/03","jDoe");
const instructor2 = new Instructor("Albert","Michael","Quinnipiac","1/2/03","mAlbert");

const course = new Course(department,courseNum,courseName,3);

institution.add_course(course);
const courseOffering = new CourseOffering(course, sectionNumber, year, quarter);

institution.add_course_offering(courseOffering);
institution.hire_instructor(instructor);
institution.list_course_schedule(year, quarter);

institution.assign_instructor(instructor, courseName, department, courseNum, sectionNumber, year, quarter);
institution.assign_instructor(instructor2, courseName, department, courseNum, sectionNumber, year, quarter);