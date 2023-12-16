interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBase2 extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBase2 {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartBase2 {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartSpecial extends CoursePartBase2 {
  requirements: string[];
  kind: 'special';
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const Part = ({ part }: { part: CoursePart }) => {
  const partStyle = {
    paddingBottom: '0.5rem'
  };
  const partBasic = (
    <div>
      <strong>
        {part.name} {part.exerciseCount}
      </strong>
      {'description' in part && (
        <div>
          <i>{part.description}</i>
        </div>
      )}
    </div>
  );
  switch (part.kind) {
    case 'basic':
      return <div style={partStyle}>{partBasic}</div>;
    case 'group':
      return (
        <div style={partStyle}>
          {partBasic}
          <div>project exercises {part.groupProjectCount}</div>
        </div>
      );
    case 'background':
      return (
        <div style={partStyle}>
          {partBasic}
          <div>submit to {part.backgroundMaterial}</div>
        </div>
      );
    case 'special':
      return (
        <div style={partStyle}>
          {partBasic}
          <div>required skills: {part.requirements.join(', ')}</div>
        </div>
      );
    default:
      throw new Error(`invalid part: ${JSON.stringify(part)}`);
  }
};

const Header = ({ name }: { name: string }) => {
  return <h1>{name}</h1>;
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map(part => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

const Total = ({ totalExercises }: { totalExercises: number }) => {
  return <p>Number of exercises {totalExercises}</p>;
};

const App = () => {
  const courseName: string = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
      kind: 'basic'
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: 'group'
    },
    {
      name: 'Basics of type Narrowing',
      exerciseCount: 7,
      description: 'How to go from unknown to string',
      kind: 'basic'
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      backgroundMaterial: 'https://type-level-typescript.com/template-literal-types',
      kind: 'background'
    },
    {
      name: 'TypeScript in frontend',
      exerciseCount: 10,
      description: 'a hard part',
      kind: 'basic'
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      kind: 'special'
    }
  ];
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
