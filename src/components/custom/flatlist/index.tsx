"use client";

import { Fragment, Key, ReactNode, useCallback, useEffect } from "react";

interface ListProps<T> {
	data: T[];
	keyExtractor: (item: T) => Key;
	renderItem: (item: T) => ReactNode;
	ItemSeparatorComponent?: () => ReactNode;
	ListFooterComponent?: () => ReactNode;
	onEndReached?: () => void;
	onEndReachedThreshold?: number;
}

const FlatList = <T,>({
	data,
	keyExtractor,
	renderItem,
	ItemSeparatorComponent,
	ListFooterComponent,
	onEndReached,
	onEndReachedThreshold = 0.5,
}: ListProps<T>) => {
	const handleScroll = useCallback(() => {
		const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

		if (scrollTop + clientHeight >= scrollHeight - onEndReachedThreshold) {
			if (onEndReached) onEndReached();
		}
	}, [onEndReached, onEndReachedThreshold]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	return (
		<>
			{data.map((item, index) => (
				<Fragment key={keyExtractor(item)}>
					{renderItem(item)}
					{ItemSeparatorComponent && index < data.length - 1 && <ItemSeparatorComponent />}
				</Fragment>
			))}
			{ListFooterComponent && <ListFooterComponent />}
		</>
	);
};

export default FlatList;
