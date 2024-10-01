import { getConversationsList } from "@/actions/conversations";
import { Button } from "@/components/custom/button";
import { Icons } from "@/components/icons";
import Layout from "@/components/layout";
import { POLICIES } from "@/lib/constants";
import { dateConverter } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const PolicyDetails = async ({ params }: SearchParamProps) => {
	const policy = POLICIES.find(policy => policy.slug === params.slug);
	if (!policy) return notFound();

	const user = await currentUser();
	if (!user) return notFound();

	const conversations = await getConversationsList(user, policy);

	return (
		<Layout
			back
			title={policy.name}
			className="container relative flex w-full flex-col items-center gap-5 sm:gap-10 mt-5 sm:mt-10"
		>
			{conversations.length > 0 ? (
				<div className="flex flex-col items-center mb-10 w-full gap-10 px-5">
					<div className="max-w-[730px] flex items-center w-full justify-between">
						<h3 className="text-xl md:text-[1.75rem] font-semibold">All conversations</h3>

						<Link href={`/${params.slug}/new`}>
							<Button leftIcon={<Icons.MessageAddIcon />} className="font-semibold">
								<p className="hidden sm:block">Start a conversation</p>
							</Button>
						</Link>
					</div>

					<ul className="flex w-full max-w-[730px] flex-col gap-5">
						{conversations.map(({ id, title, createdAt }) => (
							<li
								key={id}
								className="bg-background flex justify-between gap-3 cursor-pointer hover:bg-accent ring-1 ring-accent rounded-lg p-4 h-full transition-colors duration-300"
							>
								<Link href={`/${params.slug}/${id}`} className="flex flex-1 items-center gap-4">
									<div className="hidden rounded-md bg-secondary p-2 sm:block">
										<Icons.FileIcon />
									</div>

									<div className="spacey-y-1">
										<p className="line-clamp-1 text-lg">{title}</p>
										<p className="text-sm font-light text-muted-foreground">
											Created about {dateConverter(createdAt)}
										</p>
									</div>
								</Link>

								{/* TODO: Add delete button */}
								{/* <DeleteModal conversationId={id} /> */}
							</li>
						))}
					</ul>
				</div>
			) : (
				<div className="flex w-full max-w-[730px] flex-col items-center justify-center gap-5 rounded-lg bg-secondary px-10 py-8">
					<div className="rounded-full overflow-hidden size-40">
						<Image src="/assets/images/logo.png" alt="logo" width={200} height={200} className="size-full" />
					</div>

					<Link href={`/${params.slug}/new`}>
						<Button leftIcon={<Icons.MessageAddIcon />} className="font-semibold">
							Start a conversation
						</Button>
					</Link>
				</div>
			)}
		</Layout>
	);
};

export default PolicyDetails;
