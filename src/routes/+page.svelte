<script lang="ts">
	import Animate from '$lib/components/Animate.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { getLocale, translate as t } from '$lib/i18n';
	import { projetos } from '$lib/utils';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import TextAnimation from '$lib/components/TextAnimation.svelte';
	import { ArrowBigRight, ArrowRight } from 'lucide-svelte';
	// import Timeline from '$lib/components/Timeline.svelte';
	import GlowCard from '$lib/components/GlowCard.svelte';
	import foto from '$lib/images/minhafoto.png';

	let currentLocale = $state(getLocale());

	if (typeof window !== 'undefined') {
		window.addEventListener('localechange', (e) => {
			// @ts-ignore
			currentLocale = e.detail;
		});
	}

	const habilidades = [
		'JavaScript',
		'Java',
		'Node.js',
		'TypeScript',
		'Svelte',
		'Tailwind',
		'C#',
		'SQL'
	];

	const experiencias = [
		{
			cargoKey: 'experiences.1.role',
			empresaKey: 'experiences.1.company',
			periodoKey: 'experiences.1.period',
			descKey: 'experiences.1.desc'
		}
	];

	let loading = $state(false);
	let formElement: HTMLFormElement;

	const handleSubmit: SubmitFunction = () => {
		loading = true;

		return async ({ result, update }) => {
			if (result.type === 'success') {
				formElement?.reset();
			}

			await update();
			loading = false;
		};
	};
</script>

<section class="flex min-h-screen items-center">
	<div class="mx-auto w-full max-w-6xl px-4">
		<Animate>
			<div class="grid items-center gap-12 lg:grid-cols-2">
				<div class="space-y-8 text-center lg:text-left">
					<TextAnimation
						class="text-left text-4xl leading-tight font-bold text-base-content md:text-5xl lg:text-7xl"
						words={t('brand.name', currentLocale)}
					/>
					<p class="mx-auto max-w-2xl text-xl leading-relaxed text-base-content lg:mx-0">
						{t('hero.intro', currentLocale)}
					</p>
				</div>

				<div class="flex justify-center lg:justify-end">
					<div
						class="flex h-64 w-64 items-center justify-center overflow-hidden rounded-full bg-base-100 lg:h-96 lg:w-96"
					>
						<div class="flex h-full w-full items-center justify-center text-lg">
							<!-- {t('profile.photo', currentLocale)} -->
							<img class="h-full w-full object-cover" src={foto} alt="" />
						</div>
					</div>
				</div>
			</div>
		</Animate>
	</div>
</section>

<section id="sobre" class="flex items-center py-16">
	<div class="mx-auto w-full max-w-6xl px-4">
		<Animate>
			<div class="relative z-10 mx-auto max-w-7xl">
				<div class="mb-16 text-center">
					<h2 class="text-center text-3xl font-bold text-base-content lg:text-left">
						{t('about.title', currentLocale)}
					</h2>
				</div>

				<div class="grid gap-12 lg:grid-cols-2">
					<div class="h-full space-y-6">
						<div
							class="h-full rounded-lg bg-base-200 p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
						>
							<div class="mb-6 flex items-center">
								<div
									class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary"
								>
									<svg
										class="h-6 w-6 text-base-content"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										></path>
									</svg>
								</div>
								<h3 class="ml-4 text-2xl font-bold text-base-content">
									{t('about.who', currentLocale)}
								</h3>
							</div>
							<p class="mb-4 text-lg leading-relaxed text-base-content">
								{t('about.who_text', currentLocale)}
							</p>
						</div>
					</div>

					<div class="h-full space-y-6">
						<div
							class="h-full rounded-lg bg-base-200 p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
						>
							<div class="mb-6 flex items-center">
								<div
									class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary"
								>
									<svg
										class="h-6 w-6 text-base-content"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
										></path>
									</svg>
								</div>
								<h3 class="ml-4 text-2xl font-bold text-base-content">
									{t('about.skills', currentLocale)}
								</h3>
							</div>
							<div class="flex flex-wrap gap-3">
								{#each habilidades as habilidade, index}
									<span class="rounded bg-primary/20 px-3 py-1 text-sm text-primary"
										>{habilidade}</span
									>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Animate>
	</div>
</section>
<section id="projetos" class=" py-20">
	<div class="mx-auto max-w-6xl px-4">
		<Animate>
			<div class="space-y-12">
				<div class="flex w-full items-center justify-between">
					<h2 class="text-center text-3xl font-bold text-base-content lg:text-left">
						{t('projects.title', currentLocale)}
					</h2>
					<a href="/projetos" class="btn btn-primary md:px-16"
						>{t('projects.see_more', currentLocale)} <ArrowRight /></a
					>
				</div>
				<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each projetos.slice(0, 3) as projeto}
						<a
							href="/projetos/{projeto.id}"
							class="group relative rounded-lg border border-base-300 p-1 transition-all duration-500 hover:scale-102"
						>
							<GlowCard
								spread={50}
								glow={true}
								disabled={false}
								proximity={64}
								inactiveZone={0.01}
							/>
							<div class="relative flex h-full flex-col gap-4 rounded-lg bg-base-200 p-6">
								<div class="h-48 bg-base-100">
									<img
										src={projeto.imageUrl}
										alt={t(projeto.tituloKey, currentLocale)}
										class="h-full w-full rounded-lg object-cover"
									/>
								</div>
								<h3 class="text-xl font-semibold text-base-content">
									{t(projeto.tituloKey, currentLocale)}
								</h3>
								<p class="text-base-content">{t(projeto.descKey, currentLocale)}</p>
								<div class="flex flex-wrap items-start gap-2">
									{#each projeto.tecnologias as tech}
										<span class="rounded bg-primary/20 px-3 py-1 text-sm text-primary">{tech}</span>
									{/each}
								</div>
							</div>
						</a>
					{/each}
				</div>
			</div>
		</Animate>
	</div>
</section>

<section id="experiencias" class=" py-20">
	<div class="mx-auto max-w-6xl px-4">
		<Animate>
			<div class="space-y-12">
				<h2 class="text-center text-3xl font-bold text-base-content lg:text-left">
					{t('experiences.title', currentLocale)}
				</h2>
				<div class="space-y-8">
					{#each experiencias as exp}
						<div class="space-y-4 border-l-4 border-primary pl-8">
							<div class="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
								<div>
									<h3 class="text-xl font-semibold text-base-content">
										{t(exp.cargoKey, currentLocale)}
									</h3>
									<p class="font-medium text-primary">{t(exp.empresaKey, currentLocale)}</p>
								</div>
								<span class="flex-shrink-0 text-sm text-base-content"
									>{t(exp.periodoKey, currentLocale)}</span
								>
							</div>
							<p class="text-base-content">{t(exp.descKey, currentLocale)}</p>
						</div>
					{/each}
				</div>
			</div>
		</Animate>
	</div>
</section>

<section id="contato" class=" py-20 text-base-content">
	<div class="mx-auto max-w-6xl px-4">
		<div class="mb-12 text-center">
			<h2 class="text-4xl font-bold">{t('contact.title', currentLocale)}</h2>
		</div>

		<Animate>
			<div class="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
				<div class="flex flex-col gap-4 lg:mt-7">
					<div class="flex items-center gap-4 rounded-md bg-base-200 p-4">
						<div class="h-3 w-3 animate-pulse rounded-sm bg-primary"></div>
						<span class="font-medium text-base-content"
							>{t('contact.open_to_work', currentLocale)}</span
						>
					</div>

					<div class="flex items-center gap-4 rounded-md bg-base-200 p-4">
						<div class="text-base-content">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="h-6 w-6"
							>
								<path
									d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"
								/>
								<path
									d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"
								/>
							</svg>
						</div>
						<div>
							<p class="text-xs font-semibold tracking-wider text-base-content">
								{t('contact.email_label', currentLocale)}
							</p>
							<p class="text-base-content">nicolasalmeida.ps@gmail.com</p>
						</div>
					</div>

					<div class="flex items-center gap-4 rounded-md bg-base-200 p-4">
						<div class="flex h-6 w-6 flex-shrink-0 items-center justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								class="h-full w-full text-base-content"
							>
								<path
									d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
								/>
							</svg>
						</div>
						<div>
							<p class="text-xs font-semibold tracking-wider text-base-content">
								{t('contact.location_label', currentLocale)}
							</p>
							<p class="text-base-content">{t('contact.location_value', currentLocale)}</p>
						</div>
					</div>

					<div class="mt-2 flex items-center gap-4">
						<a
							href="https://github.com/niicolasaps"
							aria-label="GitHub"
							class="rounded-md bg-base-200 p-3 text-base-content transition-colors hover:bg-base-100"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="28"
								height="28"
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path
									d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
								/>
							</svg>
						</a>
						<a
							href="https://www.linkedin.com/in/nicolas-silva-a7b2b3308/"
							aria-label="LinkedIn"
							class="rounded-md bg-base-200 p-3 text-base-content transition-colors hover:bg-base-100"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="28"
								height="28"
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path
									d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
								/>
							</svg>
						</a>
						<a
							href="https://www.instagram.com/nicolas.aps_/"
							aria-label="Instagram"
							class="rounded-md bg-base-200 p-3 text-base-content transition-colors hover:bg-base-100"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="28"
								height="28"
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path
									d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.282.24.705.275 1.486.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.231 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.884a1.161 1.161 0 1 0 0 2.322 1.161 1.161 0 0 0 0-2.322zM8 4.202a3.79 3.79 0 1 0 0 7.58 3.79 3.79 0 0 0 0-7.58zm0 1.441a2.35 2.35 0 1 1 0 4.7 2.35 2.35 0 0 1 0-4.7z"
								/>
							</svg>
						</a>
						<a
							href="https://x.com/n1colassilva"
							aria-label="X (Twitter)"
							class="rounded-md bg-base-200 p-3 text-base-content transition-colors hover:bg-base-100"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="28"
								height="28"
								fill="currentColor"
								viewBox="0 0 16 16"
								><path
									d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"
								/></svg
							>
						</a>
					</div>
				</div>

				<!-- <form class="flex flex-col gap-4">
					<div>
						<label for="name" class="mb-2 block text-sm font-medium text-base-content">{t('form.name', currentLocale)}</label>
						<input
							type="text"
							id="name"
							class="input w-full"
							placeholder={t('form.placeholder.name', currentLocale)}
						/>
					</div>
					<div>
						<label for="email" class="mb-2 block text-sm font-medium text-base-content">{t('form.email', currentLocale)}</label
						>
						<input
							type="email"
							id="email"
							class="input w-full"
							placeholder={t('form.placeholder.email', currentLocale)}
						/>
					</div>
					<div>
						<label for="message" class="mb-2 block text-sm font-medium text-base-content"
							>{t('form.message', currentLocale)}</label
						>
						<textarea id="message" rows="5" class="textarea w-full" placeholder={t('form.placeholder.message', currentLocale)}
						></textarea>
					</div>
					<button type="submit" class="btn btn-primary"> {t('form.submit', currentLocale)} </button>
				</form> -->

				<form
					bind:this={formElement}
					class="flex flex-col gap-4"
					method="POST"
					action="?/send"
					use:enhance={handleSubmit}
				>
					<div>
						<label for="name" class="mb-2 block text-sm font-medium text-base-content">
							{t('form.name', currentLocale)}
						</label>
						<input
							type="text"
							id="name"
							name="name"
							class="input w-full"
							placeholder={t('form.placeholder.name', currentLocale)}
							required
							disabled={loading}
						/>
					</div>

					<div>
						<label for="email" class="mb-2 block text-sm font-medium text-base-content">
							{t('form.email', currentLocale)}
						</label>
						<input
							type="email"
							id="email"
							name="email"
							class="input w-full"
							placeholder={t('form.placeholder.email', currentLocale)}
							required
							disabled={loading}
						/>
					</div>

					<div>
						<label for="message" class="mb-2 block text-sm font-medium text-base-content">
							{t('form.message', currentLocale)}
						</label>
						<textarea
							id="message"
							name="message"
							rows="5"
							class="textarea w-full"
							placeholder={t('form.placeholder.message', currentLocale)}
							required
							disabled={loading}
						></textarea>
					</div>

					<button type="submit" class="btn btn-primary" class:loading disabled={loading}>
						{#if loading}
							<span class="loading loading-spinner"></span>
							{t('form.sending', currentLocale)}
						{:else}
							{t('form.submit', currentLocale)}
						{/if}
					</button>
				</form>
			</div>
		</Animate>
	</div>
</section>
