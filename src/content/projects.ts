import type { Project, ProjectFilters } from "./types";

export const projects: Project[] = [
  {
    slug: "omnisign",
    title: "OmniSign",
    status: "ongoing",
    kind: "infrastructure",
    system: "accessibility",
    ui_mode: "lab",
    updated_at: "2026-02-16",
    summary:
      "AI-powered Lebanese Sign Language translation system with privacy-first on-device inference and real-time interaction.",
    outcome:
      "50,000+ signs collected, 80,000+ processed samples, and strong internal recognition performance for daily-use vocabulary.",
    role: "AI and ML Lead (Team of 6)",
    stack: "TensorFlow, MediaPipe, React Native, Python, WebRTC",
    timeframe: "2024 - Present",
    architectureDiagram: "/diagrams/omnisign-architecture.svg",
    links: {
      repo: "https://github.com/laythayache/omnisign",
    },
    challenge_url: "/#contact",
    friend_project: false,
    tags: ["AI", "Accessibility", "Computer Vision"],
    thumbnail: "/omnisign-logo.png",
    featured: true,
    demoVideoUrl:
      "https://pub-f6654749f9534ed48b99cc5f4b614b9b.r2.dev/WhatsApp%20Video%202025-11-29%20at%2012.43.10%20PM.mp4",
    card: {
      accent: "teal",
      size: "lg",
      variant: "featured",
      tagline: "AI translation infrastructure for LSL",
      highlight: "Community-built dataset · Real-time translation · Privacy-first",
    },
    sections: {
      problem:
        "Lebanese Sign Language lacked usable digital infrastructure, limiting communication support in everyday and high-stakes settings.",
      systemReality:
        "No clean public dataset existed, dialects differed across regions, and the solution had to stay useful under constrained hardware and unstable connectivity.",
      intervention:
        "Designed and iterated an end-to-end pipeline from sign capture and dataset curation to model inference and multi-modal output.",
      architecture:
        "MediaPipe landmarks feed TensorFlow sequence models; inference runs on device where possible; outputs are translated to text and speech in real time.",
      tradeoffs:
        "Prioritized practical reliability and privacy over broad feature scope. Focused first on high-utility vocabulary and robust capture quality.",
      worked:
        "Established a real local dataset process, shipped repeatable inference flows, and built strong traction with communities and partners.",
      didnt:
        "Dialect variance and environment variability still impact robustness, and full conversational translation remains a longer research track.",
      reliability:
        "Added strong preprocessing and quality checks for image flows, with defensive fallbacks for low-confidence predictions.",
      unsolved:
        "Need broader vocabulary coverage, stronger real-world generalization, and sustainable long-term funding and partnerships.",
      challenges:
        "How to scale ethically with community trust while preserving quality, privacy, and regional representation.",
    },
  },
  {
    slug: "license-plate-recognition",
    title: "License Plate Recognition System",
    status: "completed",
    kind: "analysis",
    system: "security",
    ui_mode: "lab",
    updated_at: "2025-11-12",
    summary:
      "Real-time license plate detection and OCR pipeline for roadway and parking workflows.",
    outcome:
      "Delivered stable detection + text extraction under varied camera angles with post-processing to improve read quality.",
    role: "Computer Vision Engineer",
    stack: "YOLOv8, OpenCV, OCR, Python",
    timeframe: "2025",
    challenge_url: "/#contact",
    tags: ["AI", "Security", "Computer Vision"],
    featured: true,
    sections: {
      problem:
        "Manual plate logging and low-quality camera feeds caused delays and inconsistent records.",
      systemReality:
        "Low-light frames, motion blur, and variable plate formatting reduced OCR reliability.",
      intervention:
        "Built a two-stage detector + OCR flow with filtering, correction heuristics, and confidence thresholds.",
      architecture:
        "YOLOv8 for vehicle/plate localization followed by OCR extraction and post-processing normalization.",
      tradeoffs:
        "Balanced speed and precision by tuning detection thresholds and introducing fallback retries.",
      worked:
        "Improved operational accuracy for common camera setups and reduced manual correction effort.",
      didnt:
        "Extreme blur and severe occlusion still degrade extraction quality.",
      unsolved:
        "Future improvements include temporal frame aggregation and stronger multilingual OCR adaptation.",
      challenges:
        "How to keep latency low while increasing robustness in unpredictable field conditions.",
    },
  },
  {
    slug: "face-recognition",
    title: "Face Recognition System",
    status: "completed",
    kind: "analysis",
    system: "security",
    ui_mode: "lab",
    updated_at: "2025-08-20",
    summary:
      "Real-time face recognition workflow for identity matching and access scenarios.",
    outcome:
      "Shipped a practical recognition pipeline with controllable thresholds and improved false-positive handling.",
    role: "ML Engineer",
    stack: "OpenCV, Haar Cascades, Eigenfaces, Python",
    timeframe: "2025",
    challenge_url: "/#contact",
    tags: ["AI", "Security", "Computer Vision"],
    featured: true,
    sections: {
      problem:
        "Needed a low-overhead face identification system that could run in constrained environments.",
      systemReality:
        "Lighting changes, camera quality, and expression variance made matching unstable.",
      intervention:
        "Combined face detection, aligned preprocessing, and confidence-based recognition thresholds.",
      architecture:
        "OpenCV detection pipeline with feature extraction and identity scoring for real-time matching.",
      tradeoffs:
        "Chose lightweight methods for speed and compatibility instead of heavier deep models.",
      worked:
        "System performed well in controlled environments and small-to-medium identity sets.",
      didnt:
        "Accuracy dropped in poor lighting and with significant angle variance.",
      unsolved:
        "Future work includes embedding-based models and adaptive thresholding per environment.",
      challenges:
        "Balancing privacy considerations with identity verification requirements.",
    },
  },
  {
    slug: "breast-cancer-detection",
    title: "Breast Cancer Detection Model",
    status: "completed",
    kind: "analysis",
    system: "medical-ai",
    ui_mode: "lab",
    updated_at: "2025-07-18",
    summary:
      "Supervised machine learning classification model for early-stage breast cancer risk detection.",
    outcome:
      "Built a reliable baseline classifier with transparent feature engineering and evaluation strategy.",
    role: "Data Scientist",
    stack: "TensorFlow, Scikit-learn, Python",
    timeframe: "2025",
    challenge_url: "/#contact",
    tags: ["AI", "Medical", "Predictive Modeling"],
    featured: true,
    sections: {
      problem:
        "Clinicians needed interpretable predictive support to prioritize follow-up decisions.",
      systemReality:
        "Medical datasets were imbalanced and required strict preprocessing to avoid misleading results.",
      intervention:
        "Designed a supervised classification pipeline with feature normalization, evaluation guards, and model comparison.",
      architecture:
        "Preprocessing and feature engineering feed into ensemble and neural baselines with metric-focused validation.",
      tradeoffs:
        "Prioritized interpretability and calibration over marginal metric gains from opaque models.",
      worked:
        "Produced stable validation performance and clearer risk stratification than naive baselines.",
      didnt:
        "Generalization depends on dataset diversity and external clinical validation.",
      unsolved:
        "Needs broader multi-center data and explainability-first deployment pathways.",
      challenges:
        "How to operationalize clinical AI safely without overpromising certainty.",
    },
  },
  {
    slug: "home-security-system",
    title: "Home Security Embedded System",
    status: "completed",
    kind: "intervention",
    system: "embedded",
    ui_mode: "lab",
    updated_at: "2025-06-02",
    summary:
      "IoT security system using embedded sensors, Bluetooth presence logic, and app-based controls.",
    outcome:
      "Created a modular prototype with responsive alerts and practical rule-based activation.",
    role: "Embedded Systems Engineer",
    stack: "Arduino, PIR Sensors, Bluetooth, Mobile App",
    timeframe: "2024 - 2025",
    challenge_url: "/#contact",
    tags: ["Embedded", "Security", "IoT"],
    featured: true,
    sections: {
      problem:
        "Required a lightweight home monitoring setup that could respond quickly to intrusion events.",
      systemReality:
        "False positives from ambient motion and occupancy changes were common failure points.",
      intervention:
        "Combined sensor events with Bluetooth device detection to improve arming/disarming logic.",
      architecture:
        "Arduino sensor network triggers event rules and transmits alerts to a companion mobile interface.",
      tradeoffs:
        "Chose deterministic rule logic for reliability before introducing ML-based anomaly detection.",
      worked:
        "Reduced noisy alerts and improved operator trust in event notifications.",
      didnt:
        "Complex multi-occupant scenarios still require more advanced context awareness.",
      unsolved:
        "Potential next step is hybrid edge inference for richer false-alarm filtering.",
      challenges:
        "How to keep the system simple to maintain while increasing intelligence over time.",
    },
  },
  {
    slug: "network-infrastructure",
    title: "Network Security Infrastructure",
    status: "completed",
    kind: "infrastructure",
    system: "networking",
    ui_mode: "lab",
    updated_at: "2025-05-22",
    summary:
      "Enterprise network design with segmented VLAN architecture, hardened perimeter controls, and remote access policies.",
    outcome:
      "Delivered a secure baseline architecture with clearer segmentation and improved maintainability.",
    role: "Network Engineer",
    stack: "Cisco, VLANs, ASA Firewall, VPN, SSH, DHCP",
    timeframe: "2024 - 2025",
    challenge_url: "/#contact",
    tags: ["Infrastructure", "Security", "Networking"],
    featured: true,
    sections: {
      problem:
        "Needed a secure and maintainable network layout across mixed operational zones.",
      systemReality:
        "Legacy flat-network practices increased blast radius and operational risk.",
      intervention:
        "Introduced segmented VLANs, strict ACL patterns, secured remote access, and layered firewall policy.",
      architecture:
        "Core switching with segmented VLANs, edge firewall controls, VPN entry points, and controlled DHCP scopes.",
      tradeoffs:
        "Accepted additional configuration complexity to gain clearer security boundaries and observability.",
      worked:
        "Improved segmentation discipline and reduced cross-zone exposure risk.",
      didnt:
        "Legacy hardware constraints limited some policy automation workflows.",
      unsolved:
        "Future work includes stronger infrastructure-as-code patterns and richer telemetry.",
      challenges:
        "How to evolve security posture without disrupting critical day-to-day operations.",
    },
  },
  {
    slug: "social-listening-pipeline",
    title: "Social Listening Data Pipeline",
    status: "completed",
    kind: "automation",
    system: "automation",
    ui_mode: "lab",
    updated_at: "2026-01-15",
    summary:
      "Automated ETL pipeline ingesting social data from Meta, LinkedIn, and TikTok APIs using Python and scheduled cron jobs.",
    outcome:
      "Built analytics dashboards and structured data stores for large-scale trend monitoring across platforms.",
    role: "Automation Engineer",
    stack: "Python, Cron, Meta API, LinkedIn API, TikTok API, PostgreSQL",
    timeframe: "2025 - 2026",
    challenge_url: "/#contact",
    tags: ["Automation", "API Integrations", "Data Pipelines"],
    featured: true,
    card: {
      accent: "sky",
      size: "md",
      variant: "standard",
      tagline: "Cross-platform social data automation",
      highlight:
        "Multi-API ingestion · Scheduled cron jobs · Analytics dashboards",
    },
    sections: {
      problem:
        "Marketing teams needed consolidated social media analytics across Meta, LinkedIn, and TikTok but relied on manual exports and disconnected dashboards.",
      systemReality:
        "Each platform had different API structures, rate limits, and authentication flows. Data formats were inconsistent and required normalization.",
      intervention:
        "Designed an automated ETL pipeline with Python that connects to all three platform APIs, normalizes the data, and loads it into structured stores on a scheduled basis.",
      architecture:
        "Python extraction scripts run via cron jobs, hitting platform APIs with token refresh logic. Data is cleaned, normalized, and loaded into PostgreSQL. Analytics dashboards query the unified store.",
      tradeoffs:
        "Chose cron-based scheduling over event-driven architecture for simplicity and reliability. Accepted slight data delay for operational stability.",
      worked:
        "Eliminated manual data exports, unified cross-platform reporting, and enabled trend monitoring at scale.",
      didnt:
        "Real-time streaming would provide faster insights but added complexity that wasn't justified for the use case.",
      unsolved:
        "Adding more platforms and handling API deprecation gracefully as platforms evolve their data access policies.",
      challenges:
        "Managing rate limits across three different APIs while keeping data fresh and consistent.",
    },
  },
  {
    slug: "document-processing-system",
    title: "Intelligent Document Processing System",
    status: "completed",
    kind: "pipeline",
    system: "automation",
    ui_mode: "lab",
    updated_at: "2025-12-10",
    summary:
      "Automated document-processing pipeline combining OCR and transformer-based NLP to extract structured information from financial documents.",
    outcome:
      "Processed 50K+ scanned documents with automated extraction, reducing manual data entry significantly.",
    role: "AI Software Developer",
    stack: "Tesseract, OpenCV, Python, AWS Lambda, S3, Transformers",
    timeframe: "2025",
    challenge_url: "/#contact",
    tags: ["Automation", "NLP", "Data Pipelines"],
    featured: true,
    card: {
      accent: "amber",
      size: "md",
      variant: "standard",
      tagline: "OCR + NLP document automation",
      highlight: "50K+ documents · Batch processing · AWS Lambda",
    },
    sections: {
      problem:
        "Financial and administrative teams processed thousands of scanned documents manually, leading to slow turnaround and data entry errors.",
      systemReality:
        "Documents came in varied formats and quality levels. Some were handwritten, many were poorly scanned, and critical fields appeared in different locations across document types.",
      intervention:
        "Built an end-to-end pipeline combining OCR for text extraction with transformer-based NLP for field classification and structured data output.",
      architecture:
        "Documents uploaded to S3 trigger Lambda functions. Tesseract + OpenCV handle text extraction and image preprocessing. Transformer models classify and extract key fields. Results are stored in structured format.",
      tradeoffs:
        "Prioritized batch processing throughput over real-time extraction. Used rule-based fallbacks for low-confidence OCR results.",
      worked:
        "Automated extraction for standard document types with high accuracy and dramatically reduced manual processing time.",
      didnt:
        "Heavily degraded documents and handwritten sections still require manual review in some cases.",
      unsolved:
        "Expanding to more document types and improving handling of multi-language documents.",
      challenges:
        "Balancing extraction accuracy with processing speed across widely varying document quality.",
    },
  },
  {
    slug: "knowledge-assistant",
    title: "Conversational Knowledge Assistant",
    status: "completed",
    kind: "infrastructure",
    system: "ai-systems",
    ui_mode: "lab",
    updated_at: "2025-11-20",
    summary:
      "RAG-based conversational system using transformer embeddings and vector databases for querying enterprise knowledge bases.",
    outcome:
      "Enabled natural language querying of internal documentation, reducing time-to-answer for common technical questions.",
    role: "AI Engineer",
    stack: "LangChain, OpenAI, Pinecone, Python, Docker",
    timeframe: "2025",
    challenge_url: "/#contact",
    tags: ["AI", "NLP", "Automation"],
    featured: true,
    card: {
      accent: "violet",
      size: "md",
      variant: "standard",
      tagline: "Enterprise RAG knowledge system",
      highlight:
        "Vector search · Prompt chaining · Multi-step reasoning",
    },
    sections: {
      problem:
        "Team members spent significant time searching through scattered internal documentation to find answers to recurring technical questions.",
      systemReality:
        "Knowledge was spread across wikis, Slack threads, PDFs, and individual notes with no unified search interface.",
      intervention:
        "Built a retrieval-augmented generation system that indexes all documentation into vector embeddings and enables natural language querying with source citations.",
      architecture:
        "Documents are chunked and embedded into Pinecone vector database. User queries are embedded and matched against the knowledge base. LangChain orchestrates multi-step reasoning with prompt chaining for complex questions.",
      tradeoffs:
        "Chose chunked retrieval over full-document context to stay within token limits while maintaining relevance.",
      worked:
        "Dramatically reduced time-to-answer for common questions and surfaced documentation that team members didn't know existed.",
      didnt:
        "Highly nuanced or context-dependent questions sometimes returned partially relevant results.",
      unsolved:
        "Automated re-indexing as documentation changes and handling conflicting information across sources.",
      challenges:
        "Ensuring citation accuracy and maintaining trust in AI-generated answers for critical internal processes.",
    },
  },
  {
    slug: "analytics-dashboard",
    title: "Real-Time Data Analytics Dashboard",
    status: "completed",
    kind: "infrastructure",
    system: "data-engineering",
    ui_mode: "lab",
    updated_at: "2025-10-05",
    summary:
      "Interactive analytics platform using React.js and Python pipelines to visualize operational metrics and AI outputs in real time.",
    outcome:
      "Enabled large-scale data monitoring for operational decision-making across teams.",
    role: "Full-Stack Developer",
    stack: "React.js, Python, Plotly, Dash, PostgreSQL, Docker",
    timeframe: "2025",
    challenge_url: "/#contact",
    tags: ["Data Pipelines", "Automation", "Dashboards"],
    featured: true,
    card: {
      accent: "emerald",
      size: "md",
      variant: "standard",
      tagline: "Operational metrics visualization",
      highlight: "Real-time updates · KPI monitoring · Multi-team dashboards",
    },
    sections: {
      problem:
        "Operational teams lacked real-time visibility into key metrics, relying on weekly manual reports that were often outdated by the time they were reviewed.",
      systemReality:
        "Data lived in multiple databases and systems. No single interface existed for cross-system monitoring.",
      intervention:
        "Designed an interactive dashboard platform that pulls from multiple data sources in real time and presents unified KPI views tailored to different teams.",
      architecture:
        "Python backend aggregates data from PostgreSQL, APIs, and CSV feeds. React.js frontend renders interactive charts via Plotly. Auto-refresh cycles keep data current.",
      tradeoffs:
        "Used polling-based refresh rather than WebSocket streaming for simplicity and broader compatibility.",
      worked:
        "Teams gained immediate visibility into operational metrics, accelerating decision-making and reducing reliance on manual reports.",
      didnt:
        "Sub-second latency requirements would need a streaming architecture that wasn't justified for the use case.",
      unsolved:
        "Adding alerting and anomaly detection layers on top of the existing visualization platform.",
      challenges:
        "Aggregating data from disparate systems with different update frequencies into a coherent real-time view.",
    },
  },
  {
    slug: "anomaly-detection",
    title: "Autonomous Anomaly Detection System",
    status: "completed",
    kind: "analysis",
    system: "ai-systems",
    ui_mode: "lab",
    updated_at: "2025-09-15",
    summary:
      "Real-time anomaly detection system using deep learning and time-series analytics to detect operational irregularities.",
    outcome:
      "Integrated monitoring dashboards and automated alerting pipelines for live system diagnostics.",
    role: "ML Engineer",
    stack: "Python, TensorFlow, Time-Series Analysis, Docker, CloudWatch",
    timeframe: "2025",
    challenge_url: "/#contact",
    tags: ["AI", "Automation", "Data Pipelines"],
    featured: true,
    sections: {
      problem:
        "Operational systems experienced intermittent failures that went undetected until they caused visible service degradation.",
      systemReality:
        "Manual monitoring was insufficient for catching subtle patterns that preceded failures. Alert fatigue from naive threshold-based monitoring made teams ignore warnings.",
      intervention:
        "Designed a deep learning model trained on historical time-series data to identify anomalous patterns before they escalate into failures.",
      architecture:
        "Time-series data is ingested from system metrics. TensorFlow model runs inference on sliding windows. Anomaly scores trigger graduated alerts through automated pipelines. Monitoring dashboards provide real-time system health views.",
      tradeoffs:
        "Tuned for low false-positive rate to avoid alert fatigue, accepting slightly delayed detection for rare edge cases.",
      worked:
        "Caught several early warning patterns that manual monitoring missed, reducing incident response time.",
      didnt:
        "Novel failure modes not represented in training data can still be missed initially.",
      unsolved:
        "Continuous model retraining as system behavior evolves and adding correlation across multiple signal sources.",
      challenges:
        "Balancing sensitivity (catching real issues) against specificity (avoiding alert fatigue) in production environments.",
    },
  },
  {
    slug: "ml-deployment-pipeline",
    title: "Scalable AI Deployment Pipeline",
    status: "completed",
    kind: "infrastructure",
    system: "mlops",
    ui_mode: "lab",
    updated_at: "2025-08-25",
    summary:
      "End-to-end ML pipeline integrating PySpark preprocessing, TensorFlow model training, and containerized deployment with CI/CD automation.",
    outcome:
      "Reduced deployment time by 40% through automated model training, testing, and containerized deployment workflows.",
    role: "MLOps Engineer",
    stack: "PySpark, TensorFlow, Docker, Kubernetes, CI/CD, MLflow",
    timeframe: "2025",
    challenge_url: "/#contact",
    tags: ["Infrastructure", "AI", "Automation"],
    featured: true,
    sections: {
      problem:
        "Model deployment was manual and error-prone, causing delays between model development and production availability.",
      systemReality:
        "Data scientists trained models locally, then handed off artifacts to ops teams who manually containerized and deployed them. Version tracking was inconsistent.",
      intervention:
        "Built an end-to-end pipeline that automates data preprocessing, model training, evaluation, containerization, and deployment with full version tracking.",
      architecture:
        "PySpark handles data preprocessing at scale. TensorFlow trains models with experiment tracking via MLflow. Docker containerizes validated models. Kubernetes orchestrates deployment. CI/CD pipelines automate the full workflow from commit to production.",
      tradeoffs:
        "Invested upfront in pipeline infrastructure to eliminate manual deployment overhead long-term.",
      worked:
        "Reduced deployment time by 40%, eliminated deployment errors, and enabled rapid model iteration with full reproducibility.",
      didnt:
        "Complex model architectures with custom dependencies sometimes required manual Dockerfile adjustments.",
      unsolved:
        "Adding A/B testing infrastructure and automated rollback on performance regression.",
      challenges:
        "Ensuring pipeline reliability across different model architectures and data formats while keeping it simple enough for data scientists to use independently.",
    },
  },
  {
    slug: "arabic-legal-search",
    title: "Arabic Legal Document Search",
    status: "completed",
    kind: "analysis",
    system: "nlp",
    ui_mode: "lab",
    updated_at: "2025-07-30",
    summary:
      "Semantic document search system using fine-tuned Arabic BERT and Elasticsearch, achieving 87% top-3 hit rate with sub-300ms latency.",
    outcome:
      "Enabled fast semantic search across Arabic legal documents with high relevance accuracy.",
    role: "NLP Engineer",
    stack: "Arabic BERT, Elasticsearch, Python, HuggingFace, Docker",
    timeframe: "2025",
    challenge_url: "/#contact",
    tags: ["AI", "NLP", "Data Pipelines"],
    featured: true,
    sections: {
      problem:
        "Legal professionals needed to search through large volumes of Arabic legal documents quickly, but keyword search missed semantically relevant results.",
      systemReality:
        "Arabic text presents unique NLP challenges: right-to-left, morphological complexity, and limited pre-trained models compared to English.",
      intervention:
        "Fine-tuned an Arabic BERT model for semantic similarity and integrated it with an Elasticsearch index for fast retrieval with semantic re-ranking.",
      architecture:
        "Documents are indexed in Elasticsearch for fast retrieval. Queries are encoded using fine-tuned Arabic BERT. Candidate results are semantically re-ranked. The system returns top results with sub-300ms latency.",
      tradeoffs:
        "Used a hybrid keyword + semantic approach rather than pure neural search to maintain speed while improving relevance.",
      worked:
        "Achieved 87% top-3 hit rate, significantly outperforming keyword-only search for complex legal queries.",
      didnt:
        "Very short or ambiguous queries sometimes returned less relevant results. Model fine-tuning required careful curation of training pairs.",
      unsolved:
        "Expanding to cross-document reasoning and handling queries that span multiple legal domains.",
      challenges:
        "Balancing retrieval speed with semantic accuracy for a language with limited pre-trained NLP resources.",
    },
  },
  {
    slug: "sentiment-analysis-engine",
    title: "Multi-Domain Sentiment Analysis Engine",
    status: "completed",
    kind: "analysis",
    system: "nlp",
    ui_mode: "lab",
    updated_at: "2025-06-15",
    summary:
      "Production NLP pipeline for real-time sentiment classification across restaurant reviews, combining fine-tuned transformer models with custom preprocessing for Arabic-English code-switched text.",
    outcome:
      "Achieved 91% classification accuracy on mixed-language review datasets with sub-200ms inference latency per request.",
    role: "NLP Engineer",
    stack: "Python, HuggingFace Transformers, Scikit-learn, FastAPI, Docker",
    timeframe: "2025",
    challenge_url: "/#contact",
    tags: ["AI", "NLP", "Data Pipelines"],
    featured: true,
    sections: {
      problem:
        "Restaurant chains needed automated sentiment scoring across multilingual review streams to detect service quality trends before they escalated into reputation damage.",
      systemReality:
        "Reviews arrived in Arabic, English, and code-switched variants with slang, transliteration, and inconsistent formatting. Off-the-shelf sentiment models performed poorly on this linguistic mix.",
      intervention:
        "Built a custom preprocessing pipeline handling Arabic normalization, transliteration detection, and code-switch segmentation, feeding into a fine-tuned DistilBERT model with domain-specific training data.",
      architecture:
        "FastAPI ingestion endpoint receives review batches. Preprocessing normalizes text and detects language. Fine-tuned transformer classifies sentiment with confidence scores. Results are stored with metadata for dashboard consumption.",
      tradeoffs:
        "Chose DistilBERT over larger models to maintain sub-200ms latency per inference while keeping accuracy above 90%. Accepted slight precision drop for significant throughput gains.",
      worked:
        "Detected negative sentiment spikes 48 hours before they appeared in manual review cycles, enabling proactive service intervention.",
      didnt:
        "Sarcasm and heavily code-switched reviews with more than three language switches per sentence still produced unreliable classifications.",
      unsolved:
        "Expanding to additional review platforms and adding aspect-level sentiment extraction for granular feedback analysis.",
      challenges:
        "Maintaining model accuracy as language patterns evolve and new slang enters the review corpus without constant retraining.",
    },
  },
  {
    slug: "dynamic-data-visualization",
    title: "Dynamic Data Visualization Platform",
    status: "completed",
    kind: "web",
    system: "data-engineering",
    ui_mode: "lab",
    updated_at: "2025-05-10",
    summary:
      "Interactive web application for real-time data exploration with dynamic chart generation, CSV/JSON ingestion, and collaborative filtering across multi-dimensional datasets.",
    outcome:
      "Enabled non-technical users to upload, explore, and share interactive visualizations without writing code, processing datasets up to 500K rows client-side.",
    role: "Full-Stack Developer",
    stack: "React.js, D3.js, TypeScript, Node.js, Express, PostgreSQL",
    timeframe: "2025",
    challenge_url: "/#contact",
    tags: ["Web Development", "Data Pipelines", "Dashboards"],
    featured: true,
    sections: {
      problem:
        "Analysts and project managers needed interactive data exploration capabilities without depending on engineering teams to build custom dashboards for every request.",
      systemReality:
        "Existing tools were either too technical for non-developers or too limited for meaningful multi-dimensional analysis. Large datasets caused browser performance degradation.",
      intervention:
        "Built a web platform with drag-and-drop chart configuration, intelligent data type detection, and progressive rendering for large datasets using virtualized rendering and Web Workers.",
      architecture:
        "React frontend with D3.js rendering engine. Node.js/Express backend handles file ingestion, schema inference, and query optimization. PostgreSQL stores persistent datasets. Web Workers offload heavy data transformations from the main thread.",
      tradeoffs:
        "Implemented client-side data processing with Web Workers for datasets under 500K rows to reduce server load, falling back to server-side aggregation for larger datasets.",
      worked:
        "Reduced dashboard request backlog by 70% as teams self-served their visualization needs. Chart render time stayed under 300ms for typical datasets.",
      didnt:
        "Highly complex multi-join visualizations across multiple uploaded datasets required more sophisticated query planning than the current architecture supports.",
      unsolved:
        "Adding real-time collaborative editing and version history for shared visualization configurations.",
      challenges:
        "Maintaining responsive UI performance across devices while rendering complex D3.js visualizations with large data volumes.",
    },
  },
  {
    slug: "vinyl-ecommerce",
    title: "Vinyl Record E-Commerce Platform",
    status: "completed",
    kind: "web",
    system: "web-development",
    ui_mode: "lab",
    updated_at: "2025-04-20",
    summary:
      "Full-stack e-commerce platform for vinyl record sales with inventory management, Stripe payment integration, and recommendation engine based on listening history.",
    outcome:
      "Delivered a production-ready storefront with secure checkout, real-time inventory tracking, and personalized recommendations that increased average order value by 22%.",
    role: "Full-Stack Developer",
    stack: "React.js, Node.js, Express, MongoDB, Stripe API, Redis",
    timeframe: "2025",
    challenge_url: "/#contact",
    tags: ["Web Development", "E-Commerce", "API Integrations"],
    featured: true,
    sections: {
      problem:
        "A vinyl record retailer needed a custom e-commerce solution that could handle inventory across multiple suppliers, process payments securely, and recommend records based on customer preferences.",
      systemReality:
        "Off-the-shelf e-commerce platforms lacked the specialized inventory management needed for vinyl (pressings, editions, conditions) and didn't support the recommendation logic the business required.",
      intervention:
        "Built a custom full-stack platform with specialized data models for vinyl inventory, integrated Stripe for PCI-compliant payments, and implemented collaborative filtering for recommendations.",
      architecture:
        "React SPA with server-side rendering for SEO. Express REST API handles catalog, orders, and user management. MongoDB stores product catalog with vinyl-specific schemas. Redis caches session data and recommendation precomputations. Stripe handles payment processing.",
      tradeoffs:
        "Chose MongoDB over SQL for flexible product schemas across different vinyl formats and editions. Accepted eventual consistency for inventory counts across supplier feeds.",
      worked:
        "Secure checkout with zero payment-related incidents. Recommendation engine increased average cart size from 1.8 to 2.2 items. Inventory sync ran reliably across three supplier APIs.",
      didnt:
        "Real-time inventory synchronization across suppliers occasionally showed stale stock for high-demand releases during peak traffic.",
      unsolved:
        "Adding auction functionality for rare pressings and integrating with Discogs API for automated catalog enrichment.",
      challenges:
        "Maintaining data consistency between supplier inventory feeds that update at different intervals while keeping the storefront responsive.",
    },
  },
  {
    slug: "sql-database-management",
    title: "SQL Database Management System",
    status: "completed",
    kind: "infrastructure",
    system: "data-engineering",
    ui_mode: "lab",
    updated_at: "2025-03-15",
    summary:
      "Relational database design and administration system implementing normalized schemas, stored procedures, query optimization, and automated backup strategies for multi-tenant SaaS data.",
    outcome:
      "Reduced average query execution time by 65% through index optimization and query rewriting, while implementing zero-downtime schema migration workflows.",
    role: "Database Engineer",
    stack: "PostgreSQL, MySQL, Python, SQL, pgAdmin, Docker",
    timeframe: "2024 - 2025",
    challenge_url: "/#contact",
    tags: ["Infrastructure", "Data Pipelines", "Automation"],
    featured: true,
    sections: {
      problem:
        "Growing SaaS applications suffered from degrading query performance, inconsistent data integrity, and risky manual migration processes that caused downtime during schema changes.",
      systemReality:
        "Databases had accumulated technical debt: denormalized tables, missing indexes, unoptimized queries running full table scans, and no automated backup verification.",
      intervention:
        "Conducted systematic database audits, redesigned schemas to 3NF where appropriate, implemented comprehensive indexing strategies, and built automated migration and backup pipelines.",
      architecture:
        "PostgreSQL primary with read replicas for analytics queries. Python scripts automate schema migrations with rollback capabilities. Stored procedures encapsulate complex business logic. Automated backup pipeline with integrity verification runs on configurable schedules.",
      tradeoffs:
        "Accepted some denormalization for read-heavy analytics tables to avoid expensive joins, while maintaining strict normalization for transactional tables.",
      worked:
        "Query performance improved 65% across the board. Zero-downtime migrations eliminated the monthly maintenance windows. Automated backups with verification caught two silent corruption events.",
      didnt:
        "Some legacy application code still bypasses stored procedures and writes directly to tables, creating data consistency risks.",
      unsolved:
        "Implementing automated query performance regression testing in CI/CD and adding real-time replication monitoring dashboards.",
      challenges:
        "Balancing normalization for data integrity with denormalization for query performance across workloads with very different access patterns.",
    },
  },
  {
    slug: "line-tracking-robot",
    title: "Autonomous Line-Tracking Robot",
    status: "completed",
    kind: "embedded-hardware",
    system: "embedded",
    ui_mode: "lab",
    updated_at: "2024-12-10",
    summary:
      "PID-controlled autonomous robot with IR sensor array, real-time obstacle avoidance, and wireless telemetry for industrial line-following applications.",
    outcome:
      "Achieved consistent sub-5mm tracking accuracy at speeds up to 0.8m/s with real-time PID tuning via wireless serial interface.",
    role: "Embedded Systems Engineer",
    stack: "Arduino, C++, IR Sensors, PID Control, Bluetooth, 3D Printing",
    timeframe: "2024",
    challenge_url: "/#contact",
    tags: ["Embedded", "IoT", "Automation"],
    featured: true,
    sections: {
      problem:
        "Manufacturing floor logistics required a reliable autonomous transport system that could follow predefined paths with high precision while avoiding dynamic obstacles.",
      systemReality:
        "Commercial line-following solutions were prohibitively expensive for the scale needed. Environmental noise from factory lighting caused IR sensor interference. Floor surface reflectivity varied across zones.",
      intervention:
        "Designed a custom robot platform with an 8-sensor IR array, adaptive threshold calibration, PID-controlled differential drive, and ultrasonic obstacle detection with path recovery logic.",
      architecture:
        "Arduino Mega coordinates sensor input from IR array and ultrasonic sensors. PID controller adjusts differential motor speeds in real time. Bluetooth module streams telemetry data for remote monitoring and parameter tuning. Custom PCB integrates power management and sensor conditioning.",
      tradeoffs:
        "Chose PID over more complex control algorithms (MPC, fuzzy logic) for predictability and ease of real-time tuning. Accepted slightly slower cornering for improved tracking stability.",
      worked:
        "Consistent tracking under varying light conditions after implementing adaptive threshold calibration. Obstacle avoidance successfully handled both static and slow-moving objects.",
      didnt:
        "High-speed turns on sharp corners occasionally caused overshoot. Battery life limited continuous operation to approximately 4 hours.",
      unsolved:
        "Adding SLAM capabilities for path planning in unmapped environments and implementing fleet coordination for multi-robot scenarios.",
      challenges:
        "Achieving reliable sensor readings across different floor surfaces and lighting conditions while maintaining real-time control loop performance.",
    },
  },
  {
    slug: "fm-am-radio-pcb",
    title: "FM/AM Radio Transceiver PCB",
    status: "completed",
    kind: "embedded-hardware",
    system: "electronics",
    ui_mode: "lab",
    updated_at: "2024-11-05",
    summary:
      "Custom-designed FM/AM radio transceiver with full PCB layout in KiCad, impedance-matched antenna design, and multi-stage filtering for signal clarity.",
    outcome:
      "Successfully transmitted and received FM signals across 88-108 MHz with clean audio output and less than 3% total harmonic distortion.",
    role: "Hardware Engineer",
    stack: "KiCad, LTSpice, Soldering, RF Design, Signal Processing",
    timeframe: "2024",
    challenge_url: "/#contact",
    tags: ["Embedded", "Hardware", "Electronics"],
    featured: true,
    sections: {
      problem:
        "University capstone required designing a complete radio transceiver from schematic to fabricated PCB, demonstrating RF engineering principles and practical signal processing implementation.",
      systemReality:
        "RF circuit design demands precise impedance matching, trace geometry control, and component placement to avoid parasitic effects. Simulation-to-reality gaps in RF are significant.",
      intervention:
        "Designed the full transceiver in KiCad with separate analog and digital ground planes, controlled-impedance traces for RF paths, and multi-stage LC filters for selectivity.",
      architecture:
        "Superheterodyne receiver architecture with local oscillator, mixer stage, IF amplification, and FM demodulation. Transmitter uses voltage-controlled oscillator with pre-emphasis filtering. KiCad 4-layer PCB with dedicated RF ground plane.",
      tradeoffs:
        "Chose superheterodyne over direct conversion for better selectivity and image rejection, accepting the added complexity of IF stage alignment.",
      worked:
        "Clean reception across the full FM band with less than 3% THD. PCB first-revision success rate — no board respins needed. LTSpice simulations matched measured performance within 5%.",
      didnt:
        "AM reception sensitivity was lower than designed due to antenna impedance mismatch at lower frequencies that wasn't fully captured in simulation.",
      unsolved:
        "Adding digital signal processing for adaptive noise cancellation and implementing software-defined radio capabilities on a future revision.",
      challenges:
        "Managing electromagnetic interference between transmitter and receiver sections on the same board while maintaining signal integrity across frequency bands.",
    },
  },
  {
    slug: "enterprise-vision-analytics",
    title: "Enterprise Vision Analytics Platform",
    status: "completed",
    kind: "pipeline",
    system: "ai-systems",
    ui_mode: "lab",
    updated_at: "2025-10-20",
    summary:
      "Production computer vision platform using YOLOv8 for real-time object detection with automated model retraining, A/B deployment, and monitoring dashboards processing 2M+ frames daily.",
    outcome:
      "Achieved 95% detection accuracy in production with automated retraining pipelines that maintained model performance as data distributions shifted over time.",
    role: "Computer Vision Engineer",
    stack: "YOLOv8, Python, Docker, AWS EC2, S3, FastAPI, Grafana",
    timeframe: "2025",
    challenge_url: "/#contact",
    tags: ["AI", "Computer Vision", "Infrastructure"],
    featured: true,
    card: {
      accent: "teal",
      size: "md",
      variant: "standard",
      tagline: "Production CV with automated retraining",
      highlight: "2M+ frames/day · 95% accuracy · Auto-retraining pipeline",
    },
    sections: {
      problem:
        "Enterprise monitoring required real-time object detection at scale, but model accuracy degraded over time as environmental conditions and object appearances changed.",
      systemReality:
        "Initial deployment worked well but accuracy dropped from 95% to 82% within three months due to seasonal lighting changes, new object types, and camera angle drift from maintenance.",
      intervention:
        "Built an end-to-end platform with automated data collection from production inference, human-in-the-loop labeling workflows, scheduled retraining pipelines, and blue-green model deployment.",
      architecture:
        "YOLOv8 models run inference on EC2 GPU instances behind a FastAPI gateway. Low-confidence predictions are routed to labeling queues. Retraining triggers automatically when accuracy drops below threshold. Blue-green deployment swaps models with zero downtime. Grafana dashboards monitor accuracy, latency, and throughput.",
      tradeoffs:
        "Chose YOLOv8 over larger architectures for real-time inference requirements. Accepted slightly lower accuracy on edge cases for consistent sub-50ms inference latency.",
      worked:
        "Automated retraining maintained 95% accuracy over 8 months without manual intervention. Blue-green deployment eliminated model update downtime entirely.",
      didnt:
        "Extreme edge cases (heavy occlusion, unusual angles) still required manual review and periodic manual retraining data curation.",
      unsolved:
        "Adding multi-camera triangulation for 3D object tracking and implementing federated learning across geographically distributed camera networks.",
      challenges:
        "Maintaining consistent detection quality across varying lighting conditions, camera types, and environmental changes while keeping inference costs manageable at scale.",
    },
  },
  {
    slug: "cloud-image-classification",
    title: "Cloud Image Classification Service",
    status: "completed",
    kind: "cloud",
    system: "ai-systems",
    ui_mode: "lab",
    updated_at: "2025-09-01",
    summary:
      "Serverless image classification API built on AWS with auto-scaling inference, model versioning, and comprehensive monitoring for production ML workloads.",
    outcome:
      "Deployed production service handling 10K+ classification requests daily with 99.7% uptime and average response time under 400ms including cold starts.",
    role: "Cloud ML Engineer",
    stack: "AWS Lambda, SageMaker, S3, API Gateway, CloudWatch, Python, TensorFlow",
    timeframe: "2025",
    challenge_url: "/#contact",
    tags: ["AI", "Cloud", "Infrastructure"],
    featured: true,
    card: {
      accent: "sky",
      size: "md",
      variant: "standard",
      tagline: "Serverless ML inference at scale",
      highlight: "10K+ daily requests · 99.7% uptime · Auto-scaling",
    },
    sections: {
      problem:
        "Image classification models trained in research environments needed a production deployment path with auto-scaling, versioning, monitoring, and cost efficiency.",
      systemReality:
        "Research models ran on local GPU machines with no scaling, no monitoring, and no rollback capability. Deploying a new model version required manual server restarts.",
      intervention:
        "Architected a serverless deployment pipeline using AWS services that automatically scales with demand, tracks model versions, and provides comprehensive operational monitoring.",
      architecture:
        "API Gateway routes requests to Lambda functions. SageMaker hosts model endpoints with auto-scaling. S3 stores model artifacts with version tagging. CloudWatch monitors latency, error rates, and throughput. Step Functions orchestrate model deployment and A/B testing workflows.",
      tradeoffs:
        "Chose Lambda + SageMaker over dedicated EC2 instances to optimize cost for bursty traffic patterns. Accepted cold start latency (~800ms) in exchange for zero idle cost.",
      worked:
        "Service scaled seamlessly from 100 to 10K+ daily requests without infrastructure changes. Model versioning enabled instant rollback when a retrained model showed regression.",
      didnt:
        "Cold start latency remained noticeable for latency-sensitive applications. Provisioned concurrency helped but increased costs significantly.",
      unsolved:
        "Implementing edge deployment for latency-critical use cases and adding multi-model inference pipelines for complex classification tasks.",
      challenges:
        "Balancing cost efficiency with latency requirements in a serverless architecture where cold starts are inherent to the compute model.",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function filterProjects(filters: ProjectFilters): Project[] {
  return projects.filter((p) => {
    if (filters.status && p.status !== filters.status) return false;
    if (filters.kind && p.kind !== filters.kind) return false;
    if (filters.system && p.system !== filters.system) return false;
    if (filters.friendOnly && !p.friend_project) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const haystack = `${p.title} ${p.summary} ${p.system}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export function listSystems(): { system: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of projects) {
    map.set(p.system, (map.get(p.system) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([system, count]) => ({ system, count }))
    .sort((a, b) => b.count - a.count);
}
