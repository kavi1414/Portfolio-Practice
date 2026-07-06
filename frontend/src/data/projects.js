const projects = [
  {
    id: 1,
    title: 'API Testing Framework with CI/CD Pipeline',
    year: '2026',
    type: 'QA Automation',
    description:
      'Built a fully automated API testing framework achieving 100% pipeline automation. Designed and executed 280 test cases covering Smoke, Regression, Data-Driven, and Negative testing. Implemented CI/CD with Jenkins and GitHub Poll SCM for automated execution on every code push.',
    highlights: [
      '280 automated test cases across 4 testing types',
      'Data-driven testing with CSV files — 10 scenarios per script',
      'JUnit reporting integrated into Jenkins dashboard',
      'CI/CD pipeline triggers on every code push',
    ],
    tags: ['Postman', 'Newman', 'Jenkins', 'GitHub', 'Node.js', 'JUnit', 'CI/CD'],
    featured: true,
  },
  {
    id: 2,
    title: 'Leafground Demo Site Test Automation',
    year: '2025',
    type: 'QA Automation',
    description:
      'Developed and executed automated test scripts to validate the elements and full functionality of a web application using a Page Object Model structure for maintainability.',
    highlights: [
      'End-to-end automated test coverage for all key user flows',
      'Page Object Model (POM) design pattern for clean, maintainable code',
      'TestNG for test organisation, grouping, and reporting',
      'Selenium WebDriver for browser automation and UI testing',
    ],
    tags: ['Java', 'Selenium WebDriver', 'TestNG', 'Maven', 'POM'],
    featured: true,
  },
  {
    id: 3,
    title: 'QuickChat',
    year: '2025',
    type: 'Full Stack + QA',
    description:
      'Real-time chat application with secure user authentication and messaging. Prepared a comprehensive manual testing report covering functional, security, and regression scenarios to ensure overall quality.',
    highlights: [
      'Real-time messaging with WebSocket integration',
      'JWT-based secure authentication',
      'Comprehensive manual testing report prepared',
      'Image uploads via Cloudinary',
    ],
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Cloudinary', 'Manual Testing'],
    featured: true,
  },
  {
    id: 4,
    title: 'UniRoute',
    year: '2025',
    type: 'Full Stack',
    description:
      "University 3rd-year group project — a web platform that helps students identify the best university and career path based on their interests and academic background using intelligent recommendations.",
    highlights: [
      '3rd-year group project at UCSC',
      'AI-driven university and career path recommendations',
      'Django REST API backend with React frontend',
    ],
    tags: ['React.js', 'Material-UI', 'Python', 'Django', 'MySQL'],
    featured: false,
  },
  {
    id: 5,
    title: 'GramaLink',
    year: '2023',
    type: 'Full Stack + QA',
    description:
      '2nd-year group project that digitalised Grama Niladhari administrative tasks in Sri Lanka. Prepared a comprehensive manual testing report to validate all workflows and ensure system quality.',
    highlights: [
      '2nd-year group project at UCSC',
      'Digitised government administrative workflows',
      'Comprehensive manual testing report prepared',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Manual Testing'],
    featured: false,
  },
  {
    id: 6,
    title: 'Real Estate Web Application',
    year: '2024',
    type: 'Full Stack',
    description:
      'Property listing platform with real-time notifications and secure user authentication, enabling users to browse, list, and manage property listings with live updates.',
    highlights: [
      'Real-time notifications via WebSockets',
      'Secure user authentication and role management',
      'Full CRUD property listing management',
    ],
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'WebSockets'],
    featured: false,
  },
  {
    id: 7,
    title: 'Network Utilities Suite',
    year: '2025',
    type: 'Systems / Python',
    description:
      'Developed a real-time network bandwidth monitor with dual CLI/GUI interface to track live usage, CPU, and RAM. Also engineered an Encrypted Chat Application using RSA public-key cryptography for secure client-server messaging.',
    highlights: [
      'Dual interface: CLI (Rich) and GUI (Tkinter)',
      'Live CPU, RAM, and bandwidth monitoring',
      'RSA public-key encrypted chat with client-server architecture',
    ],
    tags: ['Python', 'RSA', 'Socket', 'Threading', 'psutil', 'Rich', 'Tkinter'],
    featured: false,
  },
]

export default projects
