SELECT students.name AS student, AVG(duration) AS average_assignment_duration
FROM assignment_submissions
JOIN students ON students.id = student_id
WHERE end_date IS NULL
GROUP BY student
ORDER BY AVG(duration) DESC;