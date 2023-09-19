import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({courses}) => {
    
    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map(course => 
                <div key={course.id}>
                    <Header key={course.name} course={course} />
                    <Content key={course.id} course={course} />
                    <Total key={course.parts.id} course={course} />
                </div>
            )}
        </div>
      )
}

export default Course