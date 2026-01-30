document.addEventListener('DOMContentLoaded', () => {
    console.log('Premium Portfolio Loaded');

    // Add subtle intersection observer animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animatedElements = document.querySelectorAll('.card, .project-card, .hero-content > *');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

/* Blog Functionality */
const blogs = [
    {
        id: 1,
        title: "The Future of Web Development: AI Agents",
        category: "Tech",
        date: "Jan 28, 2026",
        excerpt: "How AI agents are transforming the way we build and interact with web applications.",
        content: `
            <p>Artificial Intelligence is no longer just a buzzword; it's a fundamental shift in how we approach problem-solving.</p>
            <p>In the realm of web development, AI agents are beginning to take on complex tasks, from generating code to optimizing performance in real-time.</p>
            <h3>What are AI Agents?</h3>
            <p>Unlike passive tools, agents can perceive their environment, reason about it, and take actions to achieve specific goals. This capability allows for more dynamic and responsive applications.</p>
            <p>Stay tuned as we explore this fascinating topic further!</p>
        `,
        likes: 124,
        comments: 2
    },
    {
        id: 2,
        title: "Mastering CSS Grid and Flexbox",
        category: "Development",
        date: "Dec 15, 2025",
        excerpt: "A comprehensive guide to building responsive layouts with modern CSS techniques.",
        content: `
            <p>CSS Grid and Flexbox are the two pillars of modern web layout. While they share some similarities, they are designed to solve different problems.</p>
            <p>Flexbox is one-dimensional, perfect for aligning items in a row or a column. Grid, on the other hand, is two-dimensional, allowing you to control both rows and columns simultaneously.</p>
            <p>In this post, we'll dive deep into practical examples of using both together.</p>
        `,
        likes: 89,
        comments: 0
    },
    {
        id: 3,
        title: "Life at IIT Kharagpur",
        category: "Personal",
        date: "Nov 10, 2025",
        excerpt: "Reflecting on my journey, campus life, and the lessons learned so far.",
        content: `
            <p>Campus life at IIT KGP is vibrant and full of opportunities. From late-night coding sessions to cultural fests, there's never a dull moment.</p>
            <p>Balancing academics with extracurriculars has taught me the value of time management and prioritization.</p>
        `,
        likes: 210,
        comments: 0
    }
];

// Mock Comments Data
const commentsData = {
    1: [
        { author: "Jane Doe", date: "Jan 29, 2026", text: "Great article! AI is definitely the future." },
        { author: "John Smith", date: "Jan 29, 2026", text: "I'm excited to see where this goes." }
    ],
    2: [],
    3: []
};

document.addEventListener('DOMContentLoaded', () => {
    const blogList = document.getElementById('blog-list');
    const blogDetail = document.getElementById('blog-detail');
    const backBtn = document.getElementById('back-to-blogs');

    // Elements for detail view
    const detailTitle = document.getElementById('detail-title');
    const detailDate = document.getElementById('detail-date');
    const detailCategory = document.getElementById('detail-category');
    const detailBody = document.getElementById('detail-body');
    const detailLikeCount = document.getElementById('detail-like-count');
    const commentsList = document.getElementById('comments-list');

    let currentBlogId = null;

    // Render Blog List
    function renderBlogs() {
        if (!blogList) return;
        blogList.innerHTML = blogs.map(blog => `
            <article class="card blog-card" data-id="${blog.id}">
                <div>
                    <span class="blog-category">${blog.category}</span>
                    <h3>${blog.title}</h3>
                    <p class="blog-excerpt">${blog.excerpt}</p>
                </div>
                <div class="blog-footer">
                    <span>${blog.date}</span>
                    <div class="blog-stats">
                        <span><i class="ri-heart-line"></i> ${blog.likes}</span>
                        <span><i class="ri-chat-1-line"></i> ${blog.comments}</span>
                    </div>
                </div>
            </article>
        `).join('');

        // Attach click handlers
        document.querySelectorAll('.blog-card').forEach(card => {
            card.addEventListener('click', () => {
                openBlog(parseInt(card.getAttribute('data-id')));
            });
        });
    }

    function openBlog(id) {
        const blog = blogs.find(b => b.id === id);
        if (!blog) return;

        currentBlogId = id;

        detailTitle.textContent = blog.title;
        detailDate.textContent = blog.date;
        detailCategory.textContent = blog.category;
        detailBody.innerHTML = blog.content;
        detailLikeCount.textContent = blog.likes;

        renderComments(id);

        blogList.classList.add('hidden');
        blogDetail.classList.remove('hidden');

        // Scroll to top of blog section
        const blogSection = document.getElementById('blogs');
        if (blogSection) {
            const yOffset = -80; // Navbar offset
            const y = blogSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }

    function renderComments(id) {
        const comments = commentsData[id] || [];
        if (comments.length === 0) {
            commentsList.innerHTML = '<p style="color: var(--secondary-color);">No comments yet. Be the first!</p>';
        } else {
            commentsList.innerHTML = comments.map(c => `
                <div class="comment-item">
                    <div class="comment-header">
                        <span class="comment-author">${c.author}</span>
                        <span class="comment-date">${c.date}</span>
                    </div>
                    <p>${c.text}</p>
                </div>
            `).join('');
        }
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            blogDetail.classList.add('hidden');
            blogList.classList.remove('hidden');
            currentBlogId = null;
        });
    }

    // Like Interaction (Mock)
    const likeBtn = document.getElementById('detail-like-btn');
    if (likeBtn) {
        likeBtn.addEventListener('click', () => {
            if (currentBlogId === null) return;
            const blog = blogs.find(b => b.id === currentBlogId);
            blog.likes++;
            detailLikeCount.textContent = blog.likes;

            // Visual feedback
            const icon = likeBtn.querySelector('i');
            icon.classList.remove('ri-heart-line');
            icon.classList.add('ri-heart-fill');
            icon.style.color = '#e11d48'; // Red for liked
        });
    }

    // Comment Submission
    const submitBtn = document.getElementById('submit-comment');
    const commentInput = document.getElementById('comment-input');

    if (submitBtn && commentInput) {
        submitBtn.addEventListener('click', () => {
            const text = commentInput.value.trim();
            if (!text || currentBlogId === null) return;

            if (!commentsData[currentBlogId]) commentsData[currentBlogId] = [];

            commentsData[currentBlogId].unshift({
                author: "Guest User",
                date: "Just now",
                text: text
            });

            // Update UI
            const blog = blogs.find(b => b.id === currentBlogId);
            blog.comments++;
            renderComments(currentBlogId);

            // Clear input
            commentInput.value = '';
        });
    }

    renderBlogs();
});
