Daily Progress--25 September 2026

1).What I Worked On Today

* Learned the basics of **React.js**.
* Learned the basics of **PostgreSQL**.
* Practiced simple React components and SQL queries.

2).What I Learned

i).React

* What React is.
* Components.
* JSX.
* Props.
* State.
* `useState()`.
* Event handling.
* Basic React project structure.

ii).PostgreSQL

* What PostgreSQL is.
* Database and tables.
* Data types.
* Primary keys.
* Basic SQL commands.
* `CREATE`, `INSERT`, `SELECT`, `UPDATE`, and `DELETE`.

3).What I Implemented

i).React

Created a simple counter component.

**File:** `src/Counter.jsx`

```jsx
import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h2>Count: {count}</h2>
            <button onClick={() => setCount(count + 1)}>
                Increase
            </button>
        </div>
    );
}

export default Counter;
```

**Output:**

```text
Count: 0
Count: 1
Count: 2
```

ii).PostgreSQL

Created a student table and inserted sample data.

```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    age INT
);

INSERT INTO students (name, age)
VALUES ('John', 21);

SELECT * FROM students;
```

**Output:**

```text
id | name | age
1  | John | 21
```

4).How I Implemented It

* Created a basic React component.
* Used `useState()` to update the counter.
* Created a PostgreSQL database and table.
* Practiced basic SQL queries.
* Tested the output after each implementation.

5).Problems / Errors Faced

* Initially found React JSX and `useState()` confusing.
* Had some difficulty understanding SQL syntax and table creation.

6).How I Solved Them

* Practiced with small examples.
* Checked errors and corrected the syntax.
* Ran each program/query separately to understand the output.

7).What I Plan to Work on Next

* React forms and `useEffect()`.
* React Router.
* API calls using Axios.
* PostgreSQL `JOIN` and relationships.
* Connect **React + Backend + PostgreSQL**.
