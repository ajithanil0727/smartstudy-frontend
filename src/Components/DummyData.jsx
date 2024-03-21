import { Link } from "react-router-dom";

const CourseCard = ({ title, category, instructor, image }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg mt-5 ml-5 transform transition-transform hover:scale-110 hover:shadow-xl hover:bg-gray-100">
  <img className="w-full h-36 object-cover" src={image} alt={title} />
  <div className="px-4 py-2">
    <div className="font-bold text-lg mb-1">{title}</div>
    <p className="text-gray-700 text-sm mb-1">{category}</p>
    <p className="text-gray-600 text-xs">Instructor: {instructor}</p>
  </div>
</div>
  );
};

const DummyData = () => {
  const dummyCourses = [
    {
      id: 1,
      title: 'Introduction to React',
      category: 'Web Development',
      instructor: 'John Doe',
      image: 'https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=2025&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      category: 'Data Science',
      instructor: 'Jane Smith',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    },
    {
        id: 3,
        title: 'JavaScript Advanced Concepts',
        category: 'Web Development',
        instructor: 'Bob Johnson',
        image: 'https://images.unsplash.com/photo-1531323386183-43890b5c766d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 4,
        title: 'Machine Learning Basics',
        category: 'Data Science',
        instructor: 'Emma Davis',
        image: 'https://images.unsplash.com/photo-1478104718532-efe04cc3ff7f?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 5,
        title: 'Python for Beginners',
        category: 'Programming',
        instructor: 'Alex Brown',
        image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 6,
        title: 'Graphic Design Fundamentals',
        category: 'Design',
        instructor: 'Sophia Wilson',
        image: 'https://images.unsplash.com/photo-1518976024611-28bf4b48222e?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 7,
        title: 'Introduction to Blockchain',
        category: 'Technology',
        instructor: 'Charlie Miller',
        image: 'https://images.unsplash.com/photo-1478104718532-efe04cc3ff7f?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 8,
        title: 'UX/UI Design Principles',
        category: 'Design',
        instructor: 'Liam Taylor',
        image: 'https://images.unsplash.com/photo-1518976024611-28bf4b48222e?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 9,
        title: 'Mobile App Development with React Native',
        category: 'Mobile Development',
        instructor: 'Olivia Harris',
        image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 10,
        title: 'Cybersecurity Fundamentals',
        category: 'Security',
        instructor: 'Noah Martinez',
        image: 'https://images.unsplash.com/photo-1531323386183-43890b5c766d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 11,
        title: 'Data Visualization with D3.js',
        category: 'Data Science',
        instructor: 'Ava Clark',
        image: 'https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=2025&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 12,
        title: 'Full Stack Web Development',
        category: 'Web Development',
        instructor: 'Ethan Wright',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    
  ];

  return (
    <div className="container mx-auto mt-4">
      <div className="flex justify-center space-x-4">
        <Link to="" className="px-4 py-2 bg-blue-500 text-white rounded focus:outline-none focus:shadow-outline-blue">All Courses</Link>
        <Link to="" className="px-4 py-2 bg-gray-500 text-white rounded focus:outline-none focus:shadow-outline-gray">Featured Courses</Link>
        <Link to="" className="px-4 py-2 bg-gray-500 text-white rounded focus:outline-none focus:shadow-outline-gray">Latest Courses</Link>
        
      </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {dummyCourses.map((course) => (
        <CourseCard key={course.id} {...course} />
      ))}
    </div>
    </div>
  );
};

export default DummyData;
