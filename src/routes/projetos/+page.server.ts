import { projetos } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load = (async () => {

    const allTechnologies = projetos.flatMap(projeto => projeto.tecnologias);

    const uniqueTechnologies = [...new Set(allTechnologies)];

    return { projetos, allFeatures: uniqueTechnologies };
}) satisfies PageServerLoad;