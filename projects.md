---
layout: default
title: Projects
permalink: /projects/
last_modified: 2026-09-19
---
{% assign sorted_projects = site.projects | sort: "date" | reverse %}

<nav class="toc" aria-label="Table of contents">
  <p class="toc-heading">Contents</p>
  <ol class="toc-list">
    {% for project in sorted_projects %}
    <li class="toc-item">
      <a href="#{{ project.id }}">
        <span class="toc-title">{{ project.title }}</span>
        <span class="toc-dots" aria-hidden="true"></span>
        <span class="toc-date">{{ project.date | date: "%B %Y" }}</span>
      </a>
    </li>
    {% endfor %}
  </ol>
</nav>

<div class="projects">
  {% for project in sorted_projects %}
  <div class="project" id="{{ project.id }}">
    <h2>{{ project.title }} <span class="project-date">— {{ project.date | date: "%B %Y" }}</span></h2>
    {{ project.content }}
  </div>
  {% endfor %}
</div>