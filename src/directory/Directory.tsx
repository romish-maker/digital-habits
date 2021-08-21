import React, {useEffect, useState} from "react";
import TreeItem from "@material-ui/lab/TreeItem";

type DirectoriesType = {
    id: number,
    title: string,
    children?: Array<DirectoriesType>
}

interface IDirectory {
    nodeId: string,
    label: string,
    nodeIds: Array<string>
}

export const Directory: React.FC<IDirectory> = ({nodeId, label, nodeIds}) => {

    const [directories, setDirectories] = useState<DirectoriesType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isOpenDirectory = nodeIds.includes(nodeId);

    useEffect(() => {
        async function getData () {
            if (isOpenDirectory) {
                setIsLoading(true);
                const response = await fetch(`http://164.90.161.80:3000/api/content?dirId=${nodeId}`)
                const data = await response.json()
                setDirectories(data)
                setIsLoading(false);

            }
        }
        getData().then(data => {
            console.log(data);
        })
    }, [isOpenDirectory, nodeId])

    if (isLoading) {
        return <TreeItem nodeId={nodeId} label={label} />
    }

    const directoriesChildren = (directories && directories.children) || [];

    if (directoriesChildren.length === 0) {
        return <TreeItem nodeId={nodeId} label={label} />
    }

    return (
        <TreeItem nodeId={nodeId} label={label} >
            {
                directoriesChildren.map((child: DirectoriesType) => {
                    return (
                        <Directory
                            key={child.id}
                            nodeId={String(child.id)}
                            label={child.title}
                            nodeIds={nodeIds}
                        />
                    );
                })
            }
        </TreeItem>
    );
}

