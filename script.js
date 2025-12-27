// Matrix Rain Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 10, 26, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#33ff88';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Custom Cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.classList.add('clicking');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('clicking');
});

// Terminal Logic
const output = document.getElementById('terminal-output');
const input = document.getElementById('terminal-input');
let commandHistory = [];
let historyIndex = -1;

// Hide boot screen after animation
setTimeout(() => {
    document.getElementById('boot-screen').classList.add('hidden');
    showWelcome();
}, 3000);

function showWelcome() {
    const welcomeText = `
        <pre class="ascii-art">
    ███╗   ███╗ █████╗ ██████╗ ███████╗██╗     ██╗███╗   ██╗███████╗    ███╗   ███╗██╗██╗     ██╗     ███████╗██████╗ 
    ████╗ ████║██╔══██╗██╔══██╗██╔════╝██║     ██║████╗  ██║██╔════╝    ████╗ ████║██║██║     ██║     ██╔════╝██╔══██╗
    ██╔████╔██║███████║██║  ██║█████╗  ██║     ██║██╔██╗ ██║█████╗      ██╔████╔██║██║██║     ██║     █████╗  ██████╔╝
    ██║╚██╔╝██║██╔══██║██║  ██║██╔══╝  ██║     ██║██║╚██╗██║██╔══╝      ██║╚██╔╝██║██║██║     ██║     ██╔══╝  ██╔══██╗
    ██║ ╚═╝ ██║██║  ██║██████╔╝███████╗███████╗██║██║ ╚████║███████╗    ██║ ╚═╝ ██║██║███████╗███████╗███████╗██║  ██║
    ╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝╚═╝╚═╝  ╚═══╝╚══════╝    ╚═╝     ╚═╝╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝
        </pre>
        <div class="output-line success">╔════════════════════════════════════════════════════════════════════════════╗</div>
        <div class="output-line success">║  Welcome to Madeline Miller's Interactive Portfolio Terminal v2.1.4       ║</div>
        <div class="output-line success">║  System Status: ONLINE | Security Level: GUEST | Access: GRANTED          ║</div>
        <div class="output-line success">╚════════════════════════════════════════════════════════════════════════════╝</div>
        
        <div class="output-line" style="margin-top: 1.5rem;">
            <span class="info">▸ ABOUT ME</span>
        </div>
        <div style="display: flex; gap: 1.5rem; align-items: center; margin-left: 2rem; margin-top: 0.5rem; flex-wrap: wrap;">
            <img src="assets/profile-pics/oakes-profile-pic.png" alt="Madeline Miller" style="width: 220px; height: 220px; object-fit: cover; border-radius: 50%; border: 2px solid rgb(255, 51, 235); box-shadow: 0 0 20px rgba(233, 106, 233, 0.5);">
            <div style="flex: 1; min-width: 300px;">
                <div class="output-line">
                    Hey there! I'm Madeline Miller, a Software Engineer at Argonne National Laboratory
                    with a passion for building innovative solutions. I recently graduated from UC Santa Cruz
                    with a 3.9 GPA, and I love working at the intersection of AI/ML and full-stack development!
                </div>
            </div>
        </div>
        
        <div class="output-line" style="margin-top: 1.5rem;">
            <span class="success">╔══ EXPLORE MY PORTFOLIO ══╗</span>
        </div>
        <div class="output-line" style="margin-top: 0.5rem; font-size: 1.1rem; color: #ff006e; text-shadow: 0 0 15px rgba(255, 0, 110, 0.8); font-weight: 700;">
            Type any <span style="color: #ffaa00; text-shadow: 0 0 10px rgba(255, 170, 0, 0.8);">command</span> below to learn more:
        </div>
        
        <div class="help-section" style="margin-top: 1rem;">
            <div class="command-list">
                <div><span class="cmd-item">experience</span> - View work history</div>
                <div><span class="cmd-item">projects</span> - Browse my work</div>
                <div><span class="cmd-item">skills</span> - Technical expertise</div>
                <div><span class="cmd-item">education</span> - Academic background</div>
                <div><span class="cmd-item">hobbies</span> - Personal interests</div>
                <div><span class="cmd-item">contact</span> - Get in touch</div>
                <div><span class="cmd-item">social</span> - Social links</div>
                <div><span class="cmd-item">resume</span> - Download resume</div>
                <div><span class="cmd-item">hack</span> - Access classified files 🔓</div>
                <div><span class="cmd-item">help</span> - Show all commands</div>
                <div><span class="cmd-item">clear</span> - Clear terminal</div>
            </div>
        </div>
        
        <div class="output-line" style="margin-top: 1rem;">
            <span class="info">💡 Pro tip: Use ↑↓ arrows for command history, Tab for autocomplete</span>
        </div>
    `;
    output.innerHTML = welcomeText;
    scrollToTop();  // ✅ Changed from scrollToBottom() to scrollToTop()
}

const commands = {
    help: () => {
        return `
            <div class="help-section">
                <div class="output-line success">╔══ AVAILABLE COMMANDS ══╗</div>
                <div class="output-line" style="margin-top: 0.5rem;">
                    <span class="info">Core Commands:</span>
                </div>
                <div class="command-list" style="margin-top: 0.5rem;">
                    <div><span class="cmd-item">experience</span> - View work history</div>
                    <div><span class="cmd-item">projects</span> - Browse my work</div>
                    <div><span class="cmd-item">skills</span> - Technical expertise</div>
                    <div><span class="cmd-item">education</span> - Academic background</div>
                    <div><span class="cmd-item">hobbies</span> - Personal interests</div>
                    <div><span class="cmd-item">contact</span> - Get in touch</div>
                    <div><span class="cmd-item">social</span> - Social links</div>
                </div>
                <div class="output-line" style="margin-top: 1rem;">
                    <span class="info">System Commands:</span>
                </div>
                <div class="command-list" style="margin-top: 0.5rem;">
                    <div><span class="cmd-item">resume</span> - Download resume</div>
                    <div><span class="cmd-item">hack</span> - Access mainframe</div>
                    <div><span class="cmd-item">clear</span> - Clear terminal</div>
                    <div><span class="cmd-item">exit</span> - Close terminal</div>
                    <div><span class="cmd-item">ls</span> - List files</div>
                    <div><span class="cmd-item">pwd</span> - Print directory</div>
                </div>
                <div class="output-line" style="margin-top: 1rem;">
                    <span class="info">Easter Eggs:</span> Try 'coffee', 'matrix', '42', 'whoami'
                </div>
            </div>
        `;
    },

    about: () => {
        return `
            <div class="output-line success">╔══ ACCESSING PERSONNEL FILE ══╗</div>
            <div class="output-line">Decrypting... [████████████] 100%</div>
            
            <div style="display: flex; gap: 2rem; align-items: flex-start; margin-top: 1rem; flex-wrap: wrap;">
                <div style="flex-shrink: 0;">
                    <img src="assets/profile-pics/oakes-profile-pic.png" alt="Madeline Miller" style="max-width: 200px; border-radius: 12px; border: 2px solid rgb(255, 51, 235);; box-shadow: 0 0 30px rgba(189, 72, 193, 0.5);">
                </div>
                <div style="flex: 1; min-width: 300px;">
                    <div class="output-line" style="margin-bottom: 0.5rem;">
                        <span class="info">NAME:</span> Madeline Miller
                    </div>
                    <div class="output-line" style="margin-bottom: 0.5rem;">
                        <span class="info">ROLE:</span> Software Engineer I @ Argonne National Laboratory
                    </div>
                    <div class="output-line" style="margin-bottom: 0.5rem;">
                        <span class="info">LOCATION:</span> Chicago, IL
                    </div>
                    <div class="output-line" style="margin-bottom: 0.5rem;">
                        <span class="info">STATUS:</span> Building the future, one line of code at a time
                    </div>
                    <div class="output-line" style="margin-top: 1rem;">
                        Hey there! I'm Madeline Miller, a Software Engineer at Argonne National Laboratory
                        with a passion for building innovative solutions. I recently graduated from UC Santa Cruz
                        with a 3.9 GPA, and I love working at the intersection of AI/ML and full-stack development!
                    </div>
                </div>
            </div>
        `;
    },

    experience: () => {
        return `
            <div class="output-line success">╔══ EMPLOYMENT HISTORY ══╗</div>
            <div class="output-line">Accessing records... [████████████] 100%</div>
            
            <div style="margin-top: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(51, 255, 136, 0.2);">
                <div class="output-line" style="font-size: 1.3rem; color: #ff006e; text-shadow: 0 0 15px rgba(255, 0, 110, 0.6); font-weight: 700; margin-bottom: 0.5rem;">
                    Software Engineer I <span style="font-size: 1rem; color: #ffaa00;">(June 2025 - Present)</span>
                </div>
                <div class="output-line"><span class="info">@ Argonne National Laboratory</span></div>
                <div class="output-line">• Working at the Advanced Photon Source under the X-ray Science Division, Scientific Software Engineering and Data Management</div>
                <div class="output-line">• Creating portals for scientists to view and analyze X-ray data</div>
                <div class="output-line">• Delivering reliable data management for X-ray experiments</div>
                <div style="margin: 1rem 0; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; justify-content: center;">
                    <img src="assets/experience/argonne-logo.png" alt="Argonne National Laboratory" class="experience-img" style="width: 500px;">
                    <img src="assets/experience/argonne-aps.jpg" alt="Argonne National Laboratory APS" class="experience-img" style="width: 400px;">
                </div>
            </div>

            <div style="margin-top: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(51, 255, 136, 0.2);">
                <div class="output-line" style="font-size: 1.3rem; color: #ff006e; text-shadow: 0 0 15px rgba(255, 0, 110, 0.6); font-weight: 700; margin-bottom: 0.5rem;">
                    R&D Software and DevOps Intern <span style="font-size: 1rem; color: #ffaa00;">(June 2024 - March 2025)</span>
                </div>
                <div class="output-line"><span class="info">@ Keysight Technologies</span></div>
                <div class="output-line">• Developed image generation system for customized Windows instances to signal generators</div>
                <div class="output-line">• Streamlined build promotions using REST API, Jenkins, JFrog Artifactory</div>
                <div class="output-line">• Built full stack application with enhanced functionalities and reduced reliance on executables</div>
                <div style="margin: 1rem 0; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; justify-content: center;">
                    <img src="assets/experience/key1.png" alt="Keysight 1" class="experience-img" style="max-width: 400px;">
                    <img src="assets/experience/key2.png" alt="Keysight 2" class="experience-img" style="max-width: 490px;">
                </div>
            </div>

            <div style="margin-top: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(51, 255, 136, 0.2);">
                <div class="output-line" style="font-size: 1.3rem; color: #ff006e; text-shadow: 0 0 15px rgba(255, 0, 110, 0.6); font-weight: 700; margin-bottom: 0.5rem;">
                    AI Fellow <span style="font-size: 1rem; color: #ffaa00;">(Aug 2024 - Dec 2024)</span>
                </div>
                <div class="output-line"><span class="info">@ JP Morgan Chase</span></div>
                <div class="output-line">• Built AI-driven financial news analysis agent using NLP, deep learning, and predictive modeling</div>
                <div class="output-line">• Accurately predicted stock price impacts through news summarization and sentiment analysis</div>
                <div class="output-line">• Part of Cornell University's Break Through Tech AI Studio program</div>
                <div style="margin: 1rem 0; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; justify-content: center;">
                    <img src="assets/experience/jp-morgan.png" alt="JP Morgan Chase" class="experience-img" style="width: 290px;">
                    <img src="assets/experience/stock-predictions.png" alt="Stock Predictions" class="experience-img" style="width: 650px;">
                </div>
            </div>

            <div style="margin-top: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(51, 255, 136, 0.2);">
                <div class="output-line" style="font-size: 1.3rem; color: #ff006e; text-shadow: 0 0 15px rgba(255, 0, 110, 0.6); font-weight: 700; margin-bottom: 0.5rem;">
                    Vice President <span style="font-size: 1rem; color: #ffaa00;">(May 2024 - Dec 2024)</span>
                </div>
                <div class="output-line"><span class="info">@ Girls Who Code Club, UC Santa Cruz</span></div>
                <div class="output-line">• Hosted technical workshop with Google engineers engaging 150+ members</div>
                <div class="output-line">• Boosted club membership by 25% through engaging events and positive feedback</div>
                <div style="margin: 1rem 0; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; justify-content: center;">
                    <img src="assets/experience/gwc-slug.png" alt="GWC UCSC" class="experience-img" style="width: 190px;">
                    <img src="assets/experience/gwc-old.png" alt="GWC Logo" class="experience-img" style="width: 360px;">
                </div>
            </div>

            <div style="margin-top: 1.5rem;">
                <div class="output-line" style="font-size: 1.3rem; color: #ff006e; text-shadow: 0 0 15px rgba(255, 0, 110, 0.6); font-weight: 700; margin-bottom: 0.5rem;">
                    Data Structures & Algorithms Tutor & Grader <span style="font-size: 1rem; color: #ffaa00;">(Apr 2023 - June 2024)</span>
                </div>
                <div class="output-line"><span class="info">@ UC Santa Cruz</span></div>
                <div class="output-line">• Mentored ~50 students in C/C++, improving debugging skills and test case scores</div>
                <div class="output-line">• Taught efficient use of Valgrind/GDB debuggers and in-depth coding strategies</div>
                <div style="margin: 1rem 0; display: flex; justify-content: center;">
                    <img src="assets/experience/dsa-types-tutor.png" alt="DSA Tutor" class="experience-img" style="width: 690px;">
                </div>
            </div>
        `;
    },

    skills: () => {
        return `
            <div class="output-line success">╔══ SKILL ANALYSIS ══╗</div>
            <div class="output-line">Running diagnostics... [████████████] 100%</div>
            
            <div style="margin-top: 1.5rem;">
                <div class="output-line"><span class="info">Programming Languages:</span></div>
                <div class="output-line" style="margin-left: 1rem;">Python • SQL • C • C++ • JavaScript • MATLAB • Dart • RISC-V Assembly</div>
            </div>

            <div style="margin-top: 1.5rem;">
                <div class="output-line"><span class="info">Other Technologies:</span></div>
                <div class="output-line" style="margin-left: 1rem;">Microsoft Azure • LangChain • Flask • LLMs • Flutter • Firebase • HTML • CSS</div>
                <div class="output-line" style="margin-left: 1rem;">Git • Bash Scripting • Scrum/Agile • CI/CD • Seaborn • NumPy • Pandas</div>
                <div class="output-line" style="margin-left: 1rem;">Scikit-learn • PyTorch • Jira • Confluence • Jenkins • Ansible</div>
            </div>

            <div style="margin-top: 1.5rem;">
                <div class="output-line"><span class="info">Operating Systems:</span></div>
                <div class="output-line" style="margin-left: 1rem;">Linux (Ubuntu) • macOS • Windows • Virtual Machines</div>
            </div>

            <div style="margin-top: 2rem;">
                <div class="output-line" style="font-size: 1.1rem; color: #ff006e; margin-bottom: 1rem;">
                    <span style="text-shadow: 0 0 15px rgba(255, 0, 110, 0.6); font-weight: 700;">Technologies</span>
                </div>
                <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap; justify-content: center; margin-bottom: 1rem;">
                    <img src="assets/technologies/python.png" alt="Python" class="tech-icon" title="Python" style="width: 200px;">
                    <img src="assets/technologies/c.png" alt="C" class="tech-icon" title="C" style="width: 200px;">
                    <img src="assets/technologies/dsa.png" alt="C++" class="tech-icon" title="C++" style="width: 200px;">
                    <img src="assets/technologies/matlab.png" alt="MATLAB" class="tech-icon" title="MATLAB" style="width: 200px;">
                    <img src="assets/technologies/flutter.png" alt="Flutter" class="tech-icon" title="Flutter" style="width: 200px;">
                    <div style="width: 100%; height: 0;"></div>
                    <img src="assets/technologies/github.png" alt="GitHub" class="tech-icon" title="GitHub" style="width: 200px;">
                    <img src="assets/technologies/git.png" alt="Git" class="tech-icon" title="Git" style="width: 200px;">
                    <img src="assets/technologies/linux.png" alt="Linux" class="tech-icon" title="Linux" style="width: 200px;">
                    <img src="assets/technologies/macOS.png" alt="macOS" class="tech-icon" title="macOS" style="width: 200px;">
                    <img src="assets/technologies/windows.png" alt="Windows" class="tech-icon" title="Windows" style="width: 200px;">
                </div>
            </div>
        `;
    },

    projects: () => {
        return `
            <div class="output-line success">╔══ PROJECT DATABASE ══╗</div>
            <div class="output-line">Querying repositories... [████████████] 100%</div>
            
            <div class="project-card">
                <div class="output-line"><span class="warning">PROJECT_001:</span> Deep Learning Course Scheduler</div>
                <div class="output-line"><span class="info">TIMEFRAME:</span> Sept 2024 - Dec 2024</div>
                <div class="output-line"><span class="info">TECH:</span> Deep Learning, Neural Networks, NLP, Python</div>
                <div class="output-line">AI-driven course scheduling system integrating RateMyProfessor reviews, prerequisites, 
                and major requirements using deep learning techniques, sentiment analysis, and goodness scoring.</div>
                <div class="output-line"><span class="success">IMPACT:</span> Reduced manual scheduling time by 60%</div>
                <div class="output-line" style="margin-top: 0.5rem;">
                    <a href="https://github.com/MadelineMiller/ml-course-scheduler" target="_blank">→ View on GitHub</a>
                </div>
            </div>

            <div class="project-card">
                <div class="output-line"><span class="warning">PROJECT_002:</span> NLP-Based Book Recommendation System</div>
                <div class="output-line"><span class="info">TIMEFRAME:</span> Sept 2024 - Dec 2024</div>
                <div class="output-line"><span class="info">TECH:</span> Next.js, FastAPI, TF-IDF, NLP, Python</div>
                <div class="output-line">Built recommendation system utilizing data cleaning, tokenization, feature engineering 
                (log ratings, binary encoding, TF-IDF, sentiment analysis), and TF-IDF cosine similarity.</div>
                <div class="output-line"><span class="success">IMPACT:</span> Decreased book discovery time by 70%</div>
                <div class="output-line" style="margin-top: 0.5rem;">
                    <a href="https://github.com/MadelineMiller/nlp-book-recommendations" target="_blank">→ View on GitHub</a>
                </div>
            </div>

            <div class="project-card">
                <div class="output-line"><span class="warning">PROJECT_003:</span> JP Morgan AI Financial News Analysis</div>
                <div class="output-line"><span class="info">TIMEFRAME:</span> Aug 2024 - Dec 2024</div>
                <div class="output-line"><span class="info">TECH:</span> NLP, Deep Learning, Python, Sentiment Analysis</div>
                <div class="output-line">AI-driven financial news analysis agent that predicts stock price impacts through 
                news summarization and sentiment analysis for Cornell's Break Through Tech AI Studio.</div>
                <div class="output-line"><span class="success">IMPACT:</span> Accurately predicted stock price movements with sentiment analysis</div>
                <div class="output-line" style="margin-top: 0.5rem;">
                    <a href="https://github.com/NDriDiby/AI-ML-Studio" target="_blank">→ View on GitHub</a>
                </div>
            </div>

            <div class="project-card">
                <div class="output-line"><span class="warning">PROJECT_004:</span> Keysight AI-Based Plugin Generation</div>
                <div class="output-line"><span class="info">TIMEFRAME:</span> Jan 2024 - June 2024</div>
                <div class="output-line"><span class="info">TECH:</span> Azure, LLMs, Python, LangChain, RAG</div>
                <div class="output-line">Automated AI-based plugin generation system using a RAG-based approach with Azure, 
                LLMs, Python, and LangChain for efficient plugin development.</div>
                <div class="output-line"><span class="success">IMPACT:</span> Minimized plugin development time by 75%</div>
                <div class="output-line" style="margin-top: 0.5rem;">
                    <a href="https://github.com/aajoseph-dev/UCSC-Keysight" target="_blank">→ View on GitHub</a>
                </div>
            </div>

            <div class="project-card">
                <div class="output-line"><span class="warning">PROJECT_005:</span> PostNote - Collaborative Note-Taking</div>
                <div class="output-line"><span class="info">TECH:</span> Flutter, Firebase, Mobile Development</div>
                <div class="output-line">Cross-platform mobile application for collaborative note-taking and organization 
                with real-time synchronization and sharing capabilities.</div>
                <div class="output-line"><span class="success">IMPACT:</span> Enabled seamless real-time collaboration for study groups</div>
                <div class="output-line" style="margin-top: 0.5rem;">
                    <a href="https://github.com/acolloredo/PostNote" target="_blank">→ View on GitHub</a>
                </div>
            </div>

            <div class="output-line" style="margin-top: 1rem;">
                <a href="https://github.com/MadelineMiller" target="_blank">→ More projects on GitHub</a>
            </div>
        `;
    },

    education: () => {
        return `
            <div class="output-line success">╔══ ACADEMIC CREDENTIALS ══╗</div>
            <div class="output-line">Retrieving records... [████████████] 100%</div>
            
            <div style="margin-top: 1rem;">
                <div class="output-line"><span class="warning">SEPT 2021 - MARCH 2025</span></div>
                <div class="output-line"><span class="info">Bachelor of Science in Computer Science</span></div>
                <div class="output-line">University of California, Santa Cruz</div>
                <div style="margin: 0.5rem 0;">
                    <img src="assets/education-ucsc/baskin-engineering.png" alt="UC Santa Cruz" style="width: 300px; border-radius: 8px;">
                </div>
                <div class="output-line"><span class="success">GPA: 3.9/4.0</span></div>
                <div class="output-line">Jack Baskin School of Engineering</div>
                <div class="output-line">Dean's Honors List (Top 15% of Engineering Class)</div>
            </div>

        `;
    },

    hobbies: () => {
        return `
            <div class="output-line success">╔══ PERSONAL INTERESTS ══╗</div>
            <div class="output-line">Loading profile... [████████████] 100%</div>
            
            <div style="margin-top: 1rem;">
                <div class="output-line">
                    <span class="info">When I'm not coding, you can find me:</span>
                </div>
                
                <div style="margin-top: 1rem;">
                    <div class="output-line">🏃‍♀️ <span class="warning">Running</span> - 13.1 is my favorite number!</div>
                    <div style="margin: 0.5rem 0 1rem 2rem;">
                        <img src="assets/hobbies/sc-half-marathon.png" alt="Santa Cruz Half Marathon" style="max-width: 300px; border-radius: 8px; border: 1px solid #33ff88; box-shadow: 0 0 20px rgba(51, 255, 136, 0.3);">
                    </div>
                </div>

                <div style="margin-top: 1rem;">
                    <div class="output-line">🥾 <span class="warning">Traveling</span> - This is me on a hike in Maui!</div>
                    <div style="margin: 0.5rem 0 1rem 2rem;">
                        <img src="assets/hobbies/hawaii-hike.png" alt="Hawaii Adventure" style="max-width: 300px; border-radius: 8px; border: 1px solid #33ff88; box-shadow: 0 0 20px rgba(51, 255, 136, 0.3);">
                    </div>
                </div>

                <div style="margin-top: 1rem;">
                    <div class="output-line">🏖️ <span class="warning">Beaches</span> - Love any beach anywhere!</div>
                    <div style="margin: 0.5rem 0 1rem 2rem;">
                        <img src="assets/hobbies/beach.png" alt="Beach Life" style="max-width: 300px; border-radius: 8px; border: 1px solid #33ff88; box-shadow: 0 0 20px rgba(51, 255, 136, 0.3);">
                    </div>
                </div>

                <div style="margin-top: 1rem;">
                    <div class="output-line">🤿 <span class="warning">Scuba Diving</span> - This is my on a shark dive in the Bahamas!</div>
                    <div style="margin: 0.5rem 0 1rem 2rem;">
                        <img src="assets/hobbies/scuba-shark-dive.jpeg" alt="Scuba Diving" style="width: 800px; border-radius: 8px; border: 1px solid #33ff88; box-shadow: 0 0 20px rgba(51, 255, 136, 0.3);">
                    </div>
                </div> 
            </div>
        `;
    },

    contact: () => {
        return `
            <div class="output-line success">╔══ CONTACT PROTOCOLS ══╗</div>
            <div class="output-line">Establishing secure channels... [████████████] 100%</div>
            
            <div style="margin-top: 1rem;">
                <div class="output-line"><span class="info">EMAIL:</span> <a href="mailto:madelinemiller723@gmail.com">madelinemiller723@gmail.com</a></div>
                <div class="output-line"><span class="info">LOCATION:</span> Chicago, IL</div>
                <div class="output-line"><span class="info">GITHUB:</span> <a href="https://github.com/MadelineMiller" target="_blank">github.com/MadelineMiller</a></div>
                <div class="output-line"><span class="info">LINKEDIN:</span> <a href="https://linkedin.com/in/madeline-miller" target="_blank">linkedin.com/in/madeline-miller</a></div>
            </div>
        `;
    },

    social: () => {
        return `
            <div class="output-line success">╔══ SOCIAL NETWORK LINKS ══╗</div>
            <div class="output-line">Scanning networks... [████████████] 100%</div>
            
            <div style="margin-top: 1rem;">
                <div class="output-line">→ <a href="https://github.com/MadelineMiller" target="_blank">GitHub - MadelineMiller</a></div>
                <div class="output-line">→ <a href="https://linkedin.com/in/madeline-miller" target="_blank">LinkedIn - Madeline Miller</a></div>
                <div class="output-line">→ <a href="https://madelinemiller.github.io/" target="_blank">Portfolio Website</a></div>
            </div>

            <div class="output-line" style="margin-top: 1rem;">
                <span class="info">💡 Tip:</span> Check out my GitHub for more cool projects!
            </div>
        `;
    },

    resume: () => {
        return `
            <div class="output-line success">╔══ RESUME DOWNLOAD ══╗</div>
            <div class="output-line">Preparing document... [████████████] 100%</div>
            <div class="output-line" style="margin-top: 1rem;">
                <span class="info">→ </span> <a href="assets/Resume_Madeline_Miller.pdf" download>Click here to download: Resume_Madeline_Miller.pdf</a>
            </div>
            <div class="output-line" style="margin-top: 1rem;">
                <span class="info">Quick Summary:</span>
            </div>
            <div class="output-line">• Software Engineer @ Argonne National Laboratory</div>
            <div class="output-line">• UC Santa Cruz CS Graduate (3.9 GPA)</div>
            <div class="output-line">• Experienced in Python, app dev, AI/ML</div>
        `;
    },

    hack: () => {
        return `
            <div class="output-line warning">╔══ INITIATING HACK SEQUENCE ══╗</div>
            <div class="output-line">Bypassing firewall... [████████████] 100%</div>
            <div class="output-line">Cracking encryption... [████████████] 100%</div>
            <div class="output-line">Accessing mainframe... [████████████] 100%</div>
            <div class="output-line success" style="margin-top: 1rem;">
                ✓ ACCESS GRANTED TO CLASSIFIED FILES
            </div>
            
            <div style="margin-top: 1rem;">
                <div class="output-line"><span class="error">TOP SECRET:</span> My dog is my coding and debugging buddy! 🐶</div>
            </div>
        `;
    },

    clear: () => {
        output.innerHTML = '';
        return '';
    },

    exit: () => {
        return `
            <div class="output-line error">╔══ SHUTDOWN SEQUENCE ══╗</div>
            <div class="output-line">Closing connections... [████████████] 100%</div>
            <div class="output-line">Clearing cache... [████████████] 100%</div>
            <div class="output-line success">
                Thanks for visiting! Come back anytime with 'sudo reboot' ;)
            </div>
            <div class="output-line info" style="margin-top: 1rem;">
                Want to connect? Try the 'contact' command!
            </div>
        `;
    },

    sudo: (args) => {
        if (args[0] === 'reboot') {
            location.reload();
            return '';
        }
        return `<div class="output-line error">[sudo] password for guest: </div><div class="output-line error">Permission denied. Nice try though! 😏</div>`;
    },

    ls: () => {
        return `
            <div class="output-line">about.txt    experience.log    projects/    skills.json    education.yml    hobbies.md    contact.cfg</div>
            <div class="output-line info">💡 Tip: Try commands like 'experience', 'projects', 'hobbies' to view these files!</div>
        `;
    },

    whoami: () => {
        return `<div class="output-line">guest</div><div class="output-line info">But the real question is... who is Madeline? Type 'about' to find out! 🕵️</div>`;
    },

    pwd: () => {
        return `<div class="output-line">/home/guest/portfolio/madeline_miller</div>`;
    },

    date: () => {
        return `<div class="output-line">${new Date().toString()}</div>`;
    },

    echo: (args) => {
        return `<div class="output-line">${args.join(' ')}</div>`;
    },

    cat: (args) => {
        if (args[0] === 'about.txt') return commands.about();
        if (args[0] === 'experience.log') return commands.experience();
        if (args[0] === 'skills.json') return commands.skills();
        if (args[0] === 'education.yml') return commands.education();
        if (args[0] === 'contact.cfg') return commands.contact();
        if (args[0] === 'hobbies.md') return commands.hobbies();
        return `<div class="output-line error">cat: ${args[0]}: No such file or directory</div>`;
    },

    matrix: () => {
        return `
            <div class="output-line success">Activating Matrix mode...</div>
            <div class="output-line" style="color: #33ff88; animation: glitch 0.3s infinite;">
                Wake up, Neo... The portfolio has you... Follow the green text... 🐰
            </div>
        `;
    },

    coffee: () => {
        return `
            <div class="output-line">Brewing coffee... [████████████] 100%</div>
            <div class="output-line">☕ Your virtual coffee is ready! *sips enthusiastically*</div>
            <div class="output-line success">+20 productivity boost applied!</div>
            <div class="output-line info">+15 debugging skills activated!</div>
            <div class="output-line warning">Warning: May cause excessive coding at 2 AM</div>
        `;
    },

    '42': () => {
        return `<div class="output-line success">The Answer to the Ultimate Question of Life, The Universe, and Everything. 🌌</div><div class="output-line info">Now if only we knew the question...</div>`;
    }
};

// Input event listeners
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = input.value.trim();
        if (cmd) {
            commandHistory.unshift(cmd);
            historyIndex = -1;
            processCommand(cmd);
        }
        input.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[historyIndex];
        } else if (historyIndex === 0) {
            historyIndex = -1;
            input.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const partial = input.value.toLowerCase();
        const matches = Object.keys(commands).filter(cmd => cmd.startsWith(partial));
        if (matches.length === 1) {
            input.value = matches[0];
        } else if (matches.length > 1) {
            addOutput(`<div class="output-line info">${matches.join('  ')}</div>`);
        }
    }
});

function processCommand(cmd) {
    const commandLineHTML = `<div class="output-line command-entry"><span class="prompt">guest@system:~$</span> <span class="command">${cmd}</span></div>`;
    addOutput(commandLineHTML);
    
    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (commands[command]) {
        const result = commands[command](args);
        if (result) {
            addOutput(result);
            // Scroll the command line to the top
            setTimeout(() => {
                const commandElements = output.querySelectorAll('.command-entry');
                const lastCommand = commandElements[commandElements.length - 1];
                if (lastCommand) {
                    lastCommand.scrollIntoView({ block: 'start', behavior: 'instant' });
                }
            }, 0);
        }
    } else if (cmd.trim() === '') {
        // Do nothing for empty command
    } else {
        addOutput(`<div class="output-line error">bash: ${command}: command not found</div><div class="output-line info">Type 'help' for available commands.</div>`);
        setTimeout(() => {
            const commandElements = output.querySelectorAll('.command-entry');
            const lastCommand = commandElements[commandElements.length - 1];
            if (lastCommand) {
                lastCommand.scrollIntoView({ block: 'start', behavior: 'instant' });
            }
        }, 0);
    }
}

function addOutput(html) {
    output.innerHTML += html;
}

function scrollToBottom() {
    output.scrollTop = output.scrollHeight;
}

function scrollToTop() {
    output.scrollTop = 0;
}

// Easter eggs - random glitch effect
setInterval(() => {
    if (Math.random() > 0.70) {
        document.querySelector('.terminal-container').style.animation = 'glitch 0.1s ease';
        setTimeout(() => {
            document.querySelector('.terminal-container').style.animation = '';
        }, 100);
    }
}, 3000);

// Keep input focused
document.addEventListener('click', () => {
    input.focus();
});

// Prevent losing focus
input.addEventListener('blur', () => {
    setTimeout(() => input.focus(), 0);
});