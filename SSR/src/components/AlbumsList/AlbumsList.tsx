import { Flex } from "antd";
import { FC, useEffect, useState } from "react";
import Api from "../../api/api";
import { Albums } from "../../models";
import Album from "../Album/Album";

const AlbumsList: FC = () => {
	const [data, setData] = useState<Albums>([]);

	const getData = async (): Promise<void> => {
		const data = await Api.getAlbums();
		setData(data);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<Flex wrap="wrap" gap="middle" justify="center">
			{data.map((album) => (
				<Album albumId={album.id} />
			))}
		</Flex>
	);
};

export default AlbumsList;
