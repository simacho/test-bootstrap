import React, { Component } from 'react';
import { useContext, createContext, useState , useEffect ,useCallback , useMemo } from "react";
import { Button , Alert , Badge , Form , FormControl , ListGroup } from 'react-bootstrap';
import {  Dropdown, DropdownButton , ButtonGroup } from 'react-bootstrap';
import {  Modal , InputGroup } from 'react-bootstrap';
import { Sentence , SentenceContext } from './Sentence';
import { VertexProvider , VertexContext , VertexCreate } from './Vertex'
import { MyModalInput , MyModalYesNo } from './MyModalView'

import * as util from './Util.js';

// ノードツリー
const VertexTree = (props) => {
    const vc = useContext(VertexContext)
    let depth = parseInt(props.depth)
    const [collapse , setCollapse] = useState( false )
    const [dlg , setDlg] = useState(0)

    const data = vc.vtx[props.present]
    //
    // ボタンでの開閉処理
    const VertexCollpaseButton = () => {
        return (
            <span onClick={()=>setCollapse(!collapse)} >
                {collapse ?  <i class="fas fa-plus-square"></i> : <i class="fas fa-minus-square"></i>  }
            </span>
        )
    }

    // Edit menu
    const VertexModalEdit = () => {
        const isDlgEdit = () => { return dlg == 1 ? true : false }
        const resetDlgEdit = () => {setDlg(0)}
        const okDlgEdit = (ev,arg) => {
            vc.update( props.present , arg) 
            setDlg(0) 
        }
        return (
            <MyModalInput show={isDlgEdit} onHide={resetDlgEdit}
                caption ="edit" label="label"                        
                no="close" yes="OK"
                nofunc={resetDlgEdit} yesfunc={okDlgEdit}
            />
        )
    }

    // delete menu
    const VertexModalDelete = () => {
        const isDlgDelete = () => { return dlg == 2  ? true : false }
        const resetDlgDelete = () => {setDlg(0)}
        const okDlgDelete = (ev) => {
            vc.vanish( props.present) 
            setDlg(0) 
        }
        return (
            <MyModalYesNo show={isDlgDelete} onHide={resetDlgDelete}
                caption ="delete" label="label"                        
                no="close" yes="OK"
                nofunc={resetDlgDelete} yesfunc={okDlgDelete}
            />
        )
    }

    // move menu
    const VertexModalMove= () => {
        const isDlgMove= () => { return dlg == 3 ? true : false }
        const resetDlgMove= () => {setDlg(0)}
        const okDlgMove= (ev,arg) => {
            vc.search( arg ).then( (result) => {
                vc.move( props.present , result ) 
                setDlg(0) 
            }
            )
        }
        return (
            <MyModalInput show={isDlgMove} onHide={resetDlgMove}
                caption ="move" label="label"                        
                no="close" yes="OK"
                nofunc={resetDlgMove} yesfunc={okDlgMove}
            />
        )
    }

    // create menu
    const VertexModalCreate= () => {
        const isDlgCreate= () => { return dlg == 4 ? true : false }
        const resetDlgCreate= () => {setDlg(0)}
        const okDlgCreate= (ev,arg) => {
            vc.create( props.present , arg ) 
            setDlg(0) 
        }
        return (
            <MyModalInput show={isDlgCreate} onHide={resetDlgCreate}
                caption ="Create" label="label"                        
                no="close" yes="OK"
                nofunc={resetDlgCreate} yesfunc={okDlgCreate}
            />
        )
    }

    // カスタムトグル
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={e => {
                e.preventDefault();
                onClick(e);
            }}
        >
            <span class="text-white">
                {children}
                &#x25bc;
            </span>
        </a>
    ));

    // ドロップダウンメニュー
    const VertexDropDown = () => {
        return (
            <div class="float-right" >
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" drop="up" key="up">
                    </Dropdown.Toggle>


                    <Dropdown.Menu className="super-colors ">
                        <Dropdown.Item as="button" onSelect={()=> setDlg(1) } >Edit</Dropdown.Item>
                        <Dropdown.Item as="button" onSelect={()=> setDlg(2) } >Delete</Dropdown.Item>
                        <Dropdown.Item as="button" onSelect={()=> setDlg(3) } >Move</Dropdown.Item>
                        <Dropdown.Item as="button" onSelect={()=> setDlg(4) } >Create</Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }


	// forwardRef again here!
	// Dropdown needs access to the DOM of the Menu to measure it
	const CustomMenu = React.forwardRef(
		({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
			const [value, setValue] = useState('');

			return (
				<div
					ref={ref}
					style={style}
					className={className}
					aria-labelledby={labeledBy}
				>
					<FormControl
						autoFocus
						className="mx-3 my-2 w-auto"
						placeholder="Type to filter..."
						onChange={e => setValue(e.target.value)}
						value={value}
					/>
					<ul className="list-unstyled">
						{React.Children.toArray(children).filter(
							child =>
							!value || child.props.children.toLowerCase().startsWith(value),
						)}
					</ul>
				</div>
			);
		},
	);

    const VertexDisp = () => {
        //       console.log( props.vtx.get() )
        const onclick = () => vc.setcrnt(props.present)
        let crnt = vc.crnt == props.present ? true : false
        return (
            <ListGroup.Item
                action onClick={onclick}
                active = {crnt} 
            >
                {'---'.repeat(depth)}
                {data['name']}　{props.present}
                {data['children'].length >=1 && <VertexCollpaseButton />}
                {crnt ? <VertexDropDown /> : "" }
            </ListGroup.Item>
        )
    }

    // 
    return (
        <div>
            <ListGroup as="ul">
                <VertexDisp />
            </ListGroup>
            {
                data['children'].map((child) => {
                    return <VertexTree present={child} depth={depth+1} />
                })
            }
            <VertexModalEdit />
            <VertexModalDelete />
            <VertexModalMove />
            <VertexModalCreate />
        </div>
    )
}


export const VertexView = (props) => {
    const vc = useContext(VertexContext)
    let address = props.match.params.address;
    // ノード情報の読み込み
    useEffect(() => {
        vc.load(address)
        console.log( "vertex loaded")
    },[vc.reload] )

    if (vc.vtx == null ) return "Vertex ReadErr";
    if (vc.loading == true) return "";


    return (
        <div>
            <table class="table">
                <VertexTree present={vc.root} depth='0' />
            </table>
            <VertexCreate />
        </div>
    )

}


