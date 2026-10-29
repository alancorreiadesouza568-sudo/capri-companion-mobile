# Capri Companion Mobile 🚀

Projeto completo e integrado do **Capri Assistant** otimizado para celulares Android.

## 📁 Estrutura de Arquivos
- `index.html`: Interface visual principal.
- `style.css`: Estilização responsiva para celular (Glassmorphism + Touch).
- `script.js`: Controlador de comportamentos (`arrive`, `crouch`, `teleport`, gestos).
- `assets/capri/model.json`: Arquivo de definição do modelo.

## 📲 Como rodar e publicar via Termux

1. Extraia o pacote ZIP no celular.
2. Abra o Termux e entre na pasta:
   ```bash
   cd ~/storage/shared/Download/capri-companion-mobile
   ```
3. Suba direto para o seu repositório no GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: lancamento inicial do aplicativo Capri Mobile"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   git push -u origin main
   ```
4. Ative o **GitHub Pages** nas configurações do repositório para colocar o app online!
