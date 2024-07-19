export const layout = "layouts/posts.vto";

export default function* ({ search, paginate }) {
	const tags = [
		...new Set(
			search.pages("type=posts", "date=desc").flatMap((post) => post.tags),
		),
	];
	const postsWithTag = tags.map((tag) => ({
		tag,
		posts: search.pages(`type=posts tags*=${tag}`, "date=desc"),
	}));

	for (const postWithTag of postsWithTag) {
		const options = {
			url: (n) =>
				n === 1
					? `/tags/${postWithTag.tag}/`
					: `/tags/${postWithTag.tag}/${n}/`,
			size: 10,
		};

		for (const page of paginate(postWithTag.posts, options)) {
			yield page;
		}
	}
}
