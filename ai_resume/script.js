function login(role) {
    window.location.href = role === "manager"
        ? "manager.html"
        : "feed.html";
}

function saveJob() {
    const skills = document.getElementById("skills").value.trim();
    if (!skills) return alert("Enter skills");
    localStorage.setItem("jobSkills", skills);
    window.location.href = "feed.html";
}

function loadPhoto(e) {
    const reader = new FileReader();
    reader.onload = () => {
        localStorage.setItem("profilePhoto", reader.result);
        const img = document.getElementById("photoPreview");
        img.src = reader.result;
        img.style.display = "block";
    };
    reader.readAsDataURL(e.target.files[0]);
}

function scanResume() {
    const resume = document.getElementById("resumeText").value.toLowerCase();
    const skills = localStorage.getItem("jobSkills").toLowerCase().split(",");

    let found = [], missing = [], confidence = {};

    skills.forEach(s => {
        s = s.trim();
        const count = resume.split(s).length - 1;
        if (count > 0) {
            found.push(s);
            confidence[s] = count > 1 ? "Intermediate" : "Beginner";
        } else {
            missing.push(s);
        }
    });

    localStorage.setItem("found", JSON.stringify(found));
    localStorage.setItem("missing", JSON.stringify(missing));
    localStorage.setItem("confidence", JSON.stringify(confidence));
    localStorage.setItem("score",
        Math.round(found.length / skills.length * 100)
    );

    window.location.href = "result.html";
}
