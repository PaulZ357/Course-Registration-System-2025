const Course = require('./course.js')
const Student = require('./student.js')
const CourseOffering = require('./course-offering.js')
const Instructor = require('./instructor.js')

class Institution {
  constructor (name, domain) {
    this.name = name
    this.domain = domain
    this.studentList = {}
    this.courseCatalog = {}
    this.courseSchedule = {}
    this.facultyList = {}
  }

  listStudents () {
    let msg = `\nEnrolled Students (${this.name})\n-------------------------------------------`

    const studentList = Object.values(this.studentList).map(student => `${student.lastName}, ${student.firstName}`)
    const sortedStudentList = studentList.sort()

    sortedStudentList.forEach(student => msg += ("\n" + student))

    msg += "\n"
    console.log(msg)
    return msg;
  }

  enroll_student (student) {
    if (student instanceof Student) {
      if (this.studentList[student.userName]) {
        console.log(`${student.firstName} ${student.lastName} is already enrolled!`)
        return `${student.firstName} ${student.lastName} is already enrolled!`
      } else {
        this.studentList[student.userName] = student
      }
    } else {
      throw new TypeError('Only accepts student object')
    }
  }

  register_student_for_course (student, courseName, dept, number, sectionNumber, year, quarter) {
    for (const offering of this.courseSchedule[courseName]) {
      if (dept === offering.course.department && number === offering.course.number && year === offering.year && quarter === offering.quarter && sectionNumber === offering.sectionNumber) {
        if (this.studentList[student.userName]) {
          if (offering.get_students().includes(student)) {
            console.log(`\n${student.firstName} ${student.lastName} is already enrolled in this course\n`)
            return `\n${student.firstName} ${student.lastName} is already enrolled in this course\n`
          } else {
            offering.register_students([student])
          }
        }
      } else {
        return(dept+' '+offering.course.department+' '+number+' '+offering.course.number+' '+year+' '+offering.year+' '+quarter+' '+offering.quarter+' '+sectionNumber+' '+offering.sectionNumber)
      }
    }
  }

  list_instructors () {
    //console.log(`\nInstructor List (${this.name})\n-------------------------------------------`)
    const facultyList = Object.values(this.facultyList).map(instructor => `${instructor.lastName}, ${instructor.firstName}`)
    const sortedFacultyList = facultyList.sort()
    let result = `\nInstructor List (${this.name})\n-------------------------------------------`
    sortedFacultyList.forEach(instructor => result += ('\n' + instructor))
    return result;
  }

  hire_instructor (instructor) {
    if (instructor instanceof Instructor) {
      if (instructor.userName in this.facultyList) {
        const msg = `${instructor.firstName} ${instructor.lastName} already works at this institution!`;
        console.log(msg)
        return msg;
      } else {
        this.facultyList[instructor.userName] = instructor
        return `Hired ${instructor.firstName} ${instructor.lastName}`
      }
    } else {
      throw new TypeError('Only accepts instructor object')
    }
  }

  assign_instructor (instructor, courseName, dept, number, sectionNumber, year, quarter) {
    for (const offering of this.courseSchedule[courseName]) {
      if (dept === offering.course.department && number === offering.course.number && year === offering.year && quarter === offering.quarter && sectionNumber === offering.sectionNumber) {
        if (offering.instructor === instructor) {
          const msg = `${instructor.firstName} ${instructor.lastName} is already teaching this course`;
          console.log(msg)
          return msg;
        } else {
          offering.instructor = instructor
          instructor.courseList.push(offering)
          console.log(`${instructor.firstName} ${instructor.lastName} has been assigned to teach ${offering}`)
        }
      } else {
        console.log('Course not found. Please create a course and course offering')
      }
    }
  }

  list_course_catalog () {
    console.log(`\nCourse Catalog (${this.name})\n----------------------------------------`)
    for (const course of Object.values(this.courseCatalog)) {
      console.log(course)
    }
    console.log('\n')
  }

  list_course_schedule (year, quarter, dept = null) {
    if (dept) {
      const schedule = []
      console.log(`\nCourse Schedule (${dept}, ${quarter} ${year})\n----------------------------------------`)
      for (const offerings of Object.values(this.courseSchedule)) {
        const filtered = offerings.filter(offering => offering.year === year && offering.quarter === quarter && offering.course.department === dept)
        filtered.forEach(item => schedule.push(item.toString()))
      }
      if (schedule.length) {
        schedule.forEach(item => console.log(item))
      } else {
        console.log('No offerings during this semester')
        return 'No offerings scheduled during this semester'
      }
    } else {
      const schedule = []
      console.log(`\nCourse Schedule (${quarter} ${year})\n----------------------------------------`)
      if (Object.keys(this.courseSchedule).length) {
        for (const offerings of Object.values(this.courseSchedule)) {
          const filtered = offerings.filter(offering => offering.year === year && offering.quarter === quarter)
          filtered.forEach(item => schedule.push(item.toString()))
        }
        if (schedule.length) {
          schedule.forEach(item => console.log(item))
        } else {
          console.log('No offerings scheduled during this semester')
          return 'No offerings scheduled during this semester'
        }
      } else {
        console.log('No offerings currently scheduled')
        return 'No offerings currently scheduled'
      }
    }
  }

  list_registered_students (courseName, dept, number, sectionNumber, year, quarter) {
    for (const offering of this.courseSchedule[courseName]) {
      if (dept === offering.course.department && number === offering.course.number && year === offering.year && quarter === offering.quarter && sectionNumber === offering.sectionNumber) {
        console.log(`Registered Students List (${offering})\n------------------------------------------------------------`)
        for (const student of offering.registered_students) {
          console.log(`${student.lastName}, ${student.firstName}`)
        }
      }
    }
  }

  add_course (course) {
    if (course instanceof Course) {
      if (this.courseCatalog[course.name] == course) {
        return 'Course has already been added'
      } else {
        this.courseCatalog[course.name] = course
      }
    } else {
      throw new TypeError('Only accepts course object as argument')
    }
  }

  add_course_offering (courseOffering) {
    if (courseOffering instanceof CourseOffering) {
      if (courseOffering.course.name in this.courseCatalog) {
        this.courseSchedule[courseOffering.course.name] = this.courseSchedule[courseOffering.course.name] || []
        this.courseSchedule[courseOffering.course.name].push(courseOffering)
      } else {
        return 'Please create a course before creating course offering'
      }
    } else {
      throw new TypeError('Only accepts course offering as argument')
    }
  }
}

module.exports = Institution
