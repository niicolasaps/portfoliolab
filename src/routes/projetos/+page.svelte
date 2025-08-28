<script lang="ts">
	import Animate from '$lib/components/Animate.svelte';
	import GlowCard from '$lib/components/GlowCard.svelte'; // Adjust path as needed
	import { getLocale, translate as t } from '$lib/i18n.js';
	import type { PageData } from './$types.js';
	import { CircleOff } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	const { projetos } = $derived(data);

	let currentFilter = $state('all');

	let filteredProjetos = $derived.by(() => {
		if (currentFilter === 'all') {
			return projetos;
		} else {
			return projetos.filter((projeto) =>
				projeto.tecnologias.some((tech) => tech.toLowerCase().includes(currentFilter))
			);
		}
	});

	let currentLocale = $state(getLocale());

	if (typeof window !== 'undefined') {
		window.addEventListener('localechange', (e) => {
			// @ts-ignore
			currentLocale = e.detail;
		});
	}

	function filterProjects(category: string) {
		currentFilter = category;
	}
</script>

<svelte:head>
	<title>{t('projects.page.title', currentLocale)}</title>
	<meta name="description" content={t('projects.page.description', currentLocale)} />
</svelte:head>

<main class="container mx-auto max-w-6xl py-16">
	<div class="mb-16 text-center">
		<h1 class="mb-6 text-5xl font-bold text-base-content">
			{t('projects.heading.my', currentLocale)}
			<span class="text-primary">{t('projects.heading.projects', currentLocale)}</span>
		</h1>
		<p class="mx-auto max-w-2xl text-lg text-base-content/80">
			{t('projects.description2', currentLocale)}
		</p>
	</div>

	<div class="mb-12 flex flex-wrap justify-center gap-4">
		<button
			class="btn btn-sm {currentFilter === 'all' ? 'btn-primary' : 'btn-outline'}"
			onclick={() => filterProjects('all')}
		>
			{t('projects.filter.all', currentLocale)}
		</button>

		{#each data.allFeatures as item}
			<button
				class="btn btn-sm {currentFilter === item.toLowerCase() ? 'btn-primary' : 'btn-outline'}"
				onclick={() => filterProjects(item.toLowerCase())}
			>
				{item}
			</button>
		{/each}
	</div>

	{#if filteredProjetos.length === 0}
		<div class="py-20 text-center">
			<div class="mb-4 flex justify-center text-6xl">
				<CircleOff />
			</div>
			<h3 class="mb-2 text-2xl font-bold text-base-content">
				{t('projects.empty.title', currentLocale)}
			</h3>
			<p class="text-base-content/60">{t('projects.empty.description', currentLocale)}</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-8 py-8 md:grid-cols-2 lg:grid-cols-3">
			{#each filteredProjetos as projeto, index (projeto.id)}
				<a
					href="/projetos/{projeto.id}"
					class="group relative rounded-lg border border-base-300 p-1 transition-all duration-500 hover:scale-102"
				>
					<GlowCard spread={50} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
					<Animate delay={index * 0.07}>
						<div class="relative flex h-full flex-col gap-4 rounded-lg bg-base-200 p-6">
							<div class="h-48 overflow-hidden rounded-lg bg-base-100">
								<img
									src={projeto.imageUrl}
									alt={t(projeto.tituloKey, currentLocale)}
									class="h-full w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
									loading="lazy"
								/>
							</div>
							<h3
								class="text-xl font-semibold text-base-content transition-colors group-hover:text-primary"
							>
								{t(projeto.tituloKey, currentLocale)}
							</h3>
							<p class="leading-relaxed text-base-content/80">
								{t(projeto.descKey, currentLocale)}
							</p>
							<div class="mt-auto flex flex-wrap gap-2">
								{#each projeto.tecnologias as tech}
									<span
										class="rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary"
									>
										{tech}
									</span>
								{/each}
							</div>
						</div>
					</Animate>
				</a>
			{/each}
		</div>
	{/if}
</main>
