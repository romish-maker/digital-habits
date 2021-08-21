import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import {Directory} from "../directory/Directory";

type DirectoriesType = {
    id: number,
    title: string,
    children?: Array<DirectoriesType>
}


const useStyles = makeStyles({
    root: {
        height: 216,
        flexGrow: 1,
        maxWidth: 400,
    },
});

export const Directories: React.FC = () => {

    const [directories, setDirectories] = useState<DirectoriesType | null>(null);
    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [nodeId, setNodeId] = useState<Array<string>>([]);

    useEffect(() => {
        async function getData() {
            setIsLoading(true);
            const response = await fetch("http://164.90.161.80:3000/api/content")
            const data = await response.json()
            setDirectories(data)
            setIsLoading(false);
        }
        getData();
    }, [])

    const handleToggle = (e: object, nodeIds: Array<string>) => {
        setNodeId((prevState => {
            const idx = prevState.findIndex((id) => id === nodeIds[0]);
            let newArr: Array<string> = [];
            if (idx >= 0) {
                newArr = prevState.filter((id) => id !== nodeIds[0]);
            } else if (idx === -1) {
                newArr = [...prevState, ...nodeIds];
            }
            return newArr;
        }));
    }

    const classes = useStyles();

    if (isLoading) {
        return <CircularProgress size={40} color="secondary"/>
    }
    if (error) {
        return <Typography variant="h5" color="secondary">Возникла ошибка загрузки данных...</Typography>
    }

    const directoriesChildren = directories && directories.children || [];
    if (directoriesChildren.length === 0) {
        return null;
    }

    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            onNodeSelect={handleToggle}
            expanded={nodeId}
            multiSelect
        >
            {
                directoriesChildren.map((child: DirectoriesType) => {
                    return (
                        <Directory
                            key={child.id}
                            nodeId={String(child.id)}
                            label={child.title}
                            nodeIds={nodeId}
                        />
                    );
                })
            }
        </TreeView>
    );
}

