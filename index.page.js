export const layout = "layouts/posts.vto";

export default function* ({ search, paginate }) {
	const query = "type=posts";
	const posts = search.pages(query, "date=desc");
	const options = {
		url: (n) => (n === 1 ? "/" : `/pages/${n}/`),
		size: 10,
	};

	for (const page of paginate(posts, options)) {
		yield page;
	}
}
