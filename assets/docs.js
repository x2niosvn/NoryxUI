(function () {
  "use strict";

  function syncThemeIcons(theme) {
    const cls = theme === "light" ? "fa-solid fa-moon" : "fa-solid fa-sun";
    document.querySelectorAll("[data-nx-theme-icon]").forEach((el) => {
      el.className = cls;
    });
  }

  document.addEventListener("nx:theme", (e) => syncThemeIcons(e.detail.theme));

  function highlightCodeBlocks() {
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    document.querySelectorAll("pre.nx-pre").forEach((pre) => {
      if (pre.dataset.nxHighlighted) return;
      pre.dataset.nxHighlighted = "1";
      const raw = pre.textContent;
      if (raw.trim().startsWith("<")) {
        pre.innerHTML = esc(raw).replace(
          /(&lt;\/?)([\w-]+)([\s\S]*?)(\/?&gt;)/g,
          (_, open, tag, attrs, close) => {
            const hlAttrs = attrs.replace(
              /\s([\w-]+)=("[^"]*")/g,
              ' <span class="nx-hl-attr">$1</span>=<span class="nx-hl-str">$2</span>'
            );
            return `${open}<span class="nx-hl-tag">${tag}</span>${hlAttrs}${close}`;
          }
        );
      } else {
        pre.innerHTML = esc(raw).replace(
          /(\/\*[\s\S]*?\*\/|\/\/.*$)|("[^"]*"|'[^']*')|\b(const|let|var|function|return|if|else|true|false|null|new)\b|(--nx-[\w-]+|[\w-]+)(?=\s*:)/gm,
          (m, cmt, str, kw, prop) => {
            if (cmt) return `<span class="nx-hl-cmt">${cmt}</span>`;
            if (str) return `<span class="nx-hl-str">${str}</span>`;
            if (kw) return `<span class="nx-hl-kw">${kw}</span>`;
            if (prop) return `<span class="nx-hl-prop">${prop}</span>`;
            return m;
          }
        );
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    highlightCodeBlocks();
    if (window.NoryxUI) syncThemeIcons(window.NoryxUI.theme.get());

    // Copy buttons
    document.querySelectorAll("[data-copy-target]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const target = document.querySelector(btn.getAttribute("data-copy-target"));
        if (!target) return;
        try {
          await navigator.clipboard.writeText(target.textContent.trim());
          window.NoryxUI?.toast({
            title: "Đã sao chép!",
            message: "Code snippet đã được copy vào clipboard.",
            type: "success",
            duration: 2200
          });
        } catch (_) {
          window.NoryxUI?.toast({ title: "Không thể tự copy", message: "Vui lòng bôi đen và Ctrl+C.", type: "warning" });
        }
      });
    });

    // Docs quick search modal
    const searchInput = document.getElementById("docsSearchInput");
    const searchResults = document.getElementById("docsSearchResults");
    if (searchInput && searchResults) {
      const links = Array.from(document.querySelectorAll(".nx-docs-sidebar .nx-docs-link"));
      const render = (q) => {
        const term = (q || "").trim().toLowerCase();
        const filtered = links.filter((l) => l.textContent.toLowerCase().includes(term));
        searchResults.innerHTML = filtered.length
          ? filtered.map((l) => `<a href="${l.getAttribute("href")}" class="nx-list-item nx-list-item-action" data-nx-dismiss="modal"><span>${l.textContent}</span><i class="fa-solid fa-arrow-right nx-fs-xs nx-text-subtle"></i></a>`).join("")
          : `<div class="nx-p-3 nx-text-center nx-text-muted nx-fs-sm">Không tìm thấy thành phần phù hợp.</div>`;
      };
      render("");
      searchInput.addEventListener("input", (e) => render(e.target.value));
    }

    // Ctrl+K / Cmd+K
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        const modal = document.getElementById("docsSearchModal");
        if (modal && window.NoryxUI) {
          e.preventDefault();
          window.NoryxUI.modal.open(modal);
          setTimeout(() => document.getElementById("docsSearchInput")?.focus(), 40);
        }
      }
    });

    // Scrollspy
    const sections = Array.from(document.querySelectorAll(".nx-doc-section[id]"));
    const sideLinks = Array.from(document.querySelectorAll(".nx-docs-sidebar .nx-docs-link"));
    if (sections.length && sideLinks.length) {
      const onScroll = () => {
        let current = sections[0].id;
        for (const sec of sections) {
          if (sec.getBoundingClientRect().top <= 130) current = sec.id;
        }
        sideLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + current));
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    // Icons Explorer Page
    const iconGrid = document.getElementById("noryxIconsGrid");
    const iconSearch = document.getElementById("noryxIconsSearch");
    const iconCount = document.getElementById("noryxIconsCount");
    if (iconGrid && window.NoryxUI) {
      const allIcons = window.NoryxUI.icons.list().sort();
      const renderIcons = (q = "") => {
        const term = q.trim().toLowerCase();
        const items = term ? allIcons.filter((n) => n.includes(term)) : allIcons;
        if (iconCount) iconCount.textContent = `${items.length} icons`;
        iconGrid.innerHTML = items.map((name) => `
          <button type="button" class="nx-icon-tile" data-icon-name="${name}">
            <i class="nxi nxi-${name}">${window.NoryxUI.icons.svg(name)}</i>
            <span class="nx-icon-tile-name">${name}</span>
          </button>
        `).join("");
      };
      renderIcons("");
      iconSearch?.addEventListener("input", (e) => renderIcons(e.target.value));
      iconGrid.addEventListener("click", async (e) => {
        const tile = e.target.closest("[data-icon-name]");
        if (!tile) return;
        const name = tile.getAttribute("data-icon-name");
        const snippet = `<i class="nxi nxi-${name}"></i>`;
        try { await navigator.clipboard.writeText(snippet); } catch (_) {}
        window.NoryxUI.toast({ title: `Copied: nxi-${name}`, message: snippet, type: "success", duration: 2200 });
      });
    }
  });
})();
