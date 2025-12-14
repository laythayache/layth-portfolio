export interface Project {
  title: string;
  summary: string;
  problem: string;
  approach: string;
  result: string;
  tech: string[];
  links: {
    github?: string;
    demo?: string;
    paper?: string;
  };
}

export const projects: Project[] = [
  {
    title: "Lebanese Sign Language Translation System",
    summary: "Multilingual sign language translation focusing on Lebanese Sign Language using CV, NLP, and mobile integration",
    problem: "Limited accessibility tools for Lebanese Sign Language speakers, with existing solutions lacking proper CV+NLP integration for real-time translation.",
    approach: "Built a pipeline combining computer vision for sign recognition, NLP for language processing, and Android integration for mobile deployment. Focused on Lebanese Sign Language as primary target with extensibility to other dialects.",
    result: "Delivered a working prototype demonstrating real-time sign language recognition and translation, with mobile-first architecture enabling offline capabilities and improved accessibility.",
    tech: ["Python", "Computer Vision", "NLP", "Android", "TensorFlow/PyTorch", "Mobile Development"],
    links: {
      github: "https://github.com/laythayache/sign-language-translation",
      demo: "#",
    },
  },
  {
    title: "Fashion Trend Detection System",
    summary: "Python-based ML system for analyzing and predicting fashion trends from visual data",
    problem: "Fashion retailers need data-driven insights into emerging trends, but manual analysis is time-consuming and subjective.",
    approach: "Developed a computer vision pipeline to analyze fashion imagery, extract style features, and identify trend patterns. Implemented clustering and classification models to categorize and predict trend evolution.",
    result: "Created a scalable system capable of processing large volumes of fashion imagery and generating trend insights, with potential applications in inventory planning and marketing strategy.",
    tech: ["Python", "Computer Vision", "Machine Learning", "Data Analysis", "Clustering"],
    links: {
      github: "https://github.com/laythayache/fashion-trend-detection",
    },
  },
  {
    title: "Housing Price Regression Pipeline",
    summary: "End-to-end ML pipeline for predicting housing prices with feature engineering and model optimization",
    problem: "Real estate pricing requires accurate predictions based on multiple features, but existing models lack proper feature engineering and validation.",
    approach: "Built a comprehensive regression pipeline with feature engineering, data preprocessing, model selection (tried multiple algorithms), and cross-validation. Focused on interpretability and model performance metrics.",
    result: "Achieved improved prediction accuracy compared to baseline models, with a production-ready pipeline that can be extended with additional data sources.",
    tech: ["Python", "Scikit-learn", "Pandas", "Feature Engineering", "Regression", "Data Visualization"],
    links: {
      github: "https://github.com/laythayache/housing-price-regression",
    },
  },
  {
    title: "Retail Customer Clustering Analysis",
    summary: "K-means and hierarchical clustering for customer segmentation in retail",
    problem: "Retail businesses need to understand customer segments for targeted marketing, but lack automated segmentation tools.",
    approach: "Implemented both K-means and hierarchical clustering algorithms to segment customers based on purchasing behavior. Compared approaches and selected optimal clustering parameters. Created visualizations for interpretability.",
    result: "Identified distinct customer segments with actionable insights, enabling targeted marketing strategies. Demonstrated the trade-offs between different clustering approaches.",
    tech: ["Python", "K-means", "Hierarchical Clustering", "Data Analysis", "Scikit-learn", "Visualization"],
    links: {
      github: "https://github.com/laythayache/retail-clustering",
    },
  },
  {
    title: "WhatsApp Automation & Chatbot System",
    summary: "Product-focused automation system with AI chatbot integration for business communication",
    problem: "Small businesses need automated customer communication but existing solutions are expensive or lack customization for Arabic/Lebanese contexts.",
    approach: "Designed and built an automation system integrating WhatsApp API with an AI-powered chatbot. Focused on Arabic language support, pricing models, and deployment architecture. Iterated based on user feedback.",
    result: "Delivered a working prototype with Arabic language capabilities, demonstrating product thinking around pricing, deployment, and user experience. System ready for scaling with proper infrastructure.",
    tech: ["Python", "WhatsApp API", "NLP", "Backend Services", "API Integration", "Arabic NLP"],
    links: {
      github: "https://github.com/laythayache/whatsapp-automation",
    },
  },
  {
    title: "AI Microservice for CV Analysis",
    summary: "Scalable microservice architecture for computer vision analysis with live interview Q&A capabilities",
    problem: "Organizations need scalable CV analysis tools, but monolithic solutions lack flexibility and real-time capabilities.",
    approach: "Architected a microservice-based system for CV analysis with separate services for image processing, feature extraction, and Q&A. Designed for horizontal scaling and API-first approach. Included live interview Q&A as a use case.",
    result: "Built a production-ready microservice architecture demonstrating system design principles, with APIs ready for integration. Showed understanding of cloud deployment and DevOps practices.",
    tech: ["Python", "Microservices", "Computer Vision", "API Design", "Cloud Architecture", "DevOps"],
    links: {
      github: "https://github.com/laythayache/cv-analysis-microservice",
    },
  },
  {
    title: "Network Security Analysis Lab",
    summary: "Ethical security research and network analysis tools for understanding system vulnerabilities",
    problem: "Understanding network security requires hands-on experience with analysis tools and vulnerability assessment in controlled environments.",
    approach: "Developed a lab environment for network security analysis, focusing on ethical research practices. Built tools for network traffic analysis, vulnerability scanning, and security reporting. Emphasized responsible disclosure and educational use.",
    result: "Created a comprehensive security analysis toolkit demonstrating understanding of networking, cybersecurity principles, and ethical research practices. All work conducted in controlled, educational environments.",
    tech: ["Python", "Network Security", "Cybersecurity", "Network Analysis", "Security Tools"],
    links: {
      github: "https://github.com/laythayache/security-lab",
    },
  },
  {
    title: "Automated Reporting & Analytics Dashboard",
    summary: "Data pipeline for automated report generation with visualization dashboard",
    problem: "Organizations need automated reporting but manual processes are error-prone and time-consuming.",
    approach: "Built an end-to-end data pipeline that collects, processes, and visualizes data with automated report generation. Focused on structured reporting, measurable metrics, and stakeholder-friendly outputs.",
    result: "Delivered a working system that automates report generation, reducing manual effort and improving consistency. Dashboard provides real-time insights for decision-making.",
    tech: ["Python", "Data Pipeline", "Visualization", "Automation", "Reporting", "Dashboard"],
    links: {
      github: "https://github.com/laythayache/automated-reporting",
    },
  },
];

