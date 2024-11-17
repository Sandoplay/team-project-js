<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-columns">
        <!-- Перша колонка -->
        <div class="footer-column">
          <h3 class="developer-name">Олесь Левицький</h3>
          <a
            href="https://github.com/Sandoplay"
            target="_blank"
            class="github-link"
          >
            GitHub
          </a>
        </div>

        <!-- Друга колонка -->
        <div class="footer-column">
          <h3 class="developer-name">Євген Фроляк</h3>
          <a
            href="https://github.com/EugeniusDev"
            target="_blank"
            class="github-link"
          >
            GitHub
          </a>
        </div>

        <!-- Третя колонка -->
        <div class="footer-column">
          <h3 class="developer-name">Мушин Максим</h3>
          <a
            href="https://github.com/Maksonchyks"
            target="_blank"
            class="github-link"
          >
            GitHub
          </a>
        </div>
      </div>
      <div class="copyright">
        <p>&copy; 2024 Всі права захищено</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: white;
  padding: 30px 0;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-columns {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.footer-column {
  text-align: center;
  padding: 0 15px;
}

.developer-name {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #ecf0f1;
}

.github-link {
  color: #3498db;
  text-decoration: none;
  padding: 5px 10px;
  border: 1px solid #3498db;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.github-link:hover {
  background-color: #3498db;
  color: white;
}

.copyright {
  text-align: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #34495e;
  font-size: 0.9rem;
  color: #bdc3c7;
}

@media (max-width: 768px) {
  .footer-columns {
    flex-direction: column;
    gap: 20px;
  }

  .footer-column {
    padding: 10px 0;
  }
}
</style>
