const Total = ({ course }) => {
    const sum = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return <p><b>total of {sum} exercises</b></p>
}

export default Total