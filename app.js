const tiles = document.querySelectorAll('.tile');
const content = document.getElementById('content');
const contentBody = document.getElementById('content-body');
const backBtn = document.getElementById('back-btn');

const sections = {
  overview: `
    <h3>Overview</h3>
    <p>
      Data Scientist / ML Engineer with 4+ years of experience designing,
      training and deploying machine learning systems at scale.
    </p>
    <p>
      Specialized in churn prediction, production ML, Big Data pipelines
      and GenAI systems.
    </p>
  `,

  experience: `
    <h3>Experience</h3>
    <h4>AXA — Data Scientist</h4>
    <ul>
      <li>Churn prediction on ~5M customers (Databricks, PySpark)</li>
      <li>XGBoost & CatBoost models with robust CV</li>
      <li>FastAPI deployment & CI/CD pipelines</li>
      <li>SHAP explainability for business teams</li>
    </ul>
    <p><strong>Impact:</strong> +18% precision on high-risk customers</p>
  `,

  projects: `
    <h3>Projects</h3>
    <ul>
      <li><strong>Incremental Boosting Framework</strong> – Production-ready batch training for XGBoost & CatBoost</li>
      <li><strong>BrevetAnalyzer AI</strong> – RAG-based patent analysis platform</li>
      <li><strong>SignalGuard AIOps</strong> – ML-driven observability & anomaly detection</li>
    </ul>
  `,

  skills: `
    <h3>Skills</h3>
    <p><strong>ML:</strong> XGBoost, CatBoost, LightGBM, NLP, Clustering</p>
    <p><strong>Big Data:</strong> Spark, Databricks, Airflow, Kafka</p>
    <p><strong>MLOps:</strong> MLflow, FastAPI, Docker, CI/CD</p>
    <p><strong>GenAI:</strong> RAG, LangChain, Embeddings</p>
  `,

  architecture: `
    <h3>Architecture Philosophy</h3>
    <p>
      I design ML systems end-to-end: data ingestion, feature engineering,
      training, deployment, monitoring and retraining.
    </p>
    <p>
      Focus on reliability, explainability and business impact.
    </p>
  `,

  contact: `
    <h3>Contact</h3>
    <p>Email: rostandsurel@yahoo.com</p>
    <p>Location: Versailles, France</p>
  `
};

tiles.forEach(tile => {
  tile.addEventListener('click', () => {
    const key = tile.dataset.section;
    contentBody.innerHTML = sections[key];
    content.classList.remove('hidden');
  });
});

backBtn.addEventListener('click', () => {
  content.classList.add('hidden');
});