--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.6
-- Dumped by pg_dump version 9.5.6

-- Started on 2017-06-27 12:09:32 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12395)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2170 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 184 (class 1259 OID 17468)
-- Name: boards; Type: TABLE; Schema: public; Owner: maylandertamas
--

CREATE TABLE boards (
    id integer NOT NULL,
    title character varying(60),
    user_id integer
);


ALTER TABLE boards OWNER TO maylandertamas;

--
-- TOC entry 183 (class 1259 OID 17466)
-- Name: boards_id_seq; Type: SEQUENCE; Schema: public; Owner: maylandertamas
--

CREATE SEQUENCE boards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE boards_id_seq OWNER TO maylandertamas;

--
-- TOC entry 2171 (class 0 OID 0)
-- Dependencies: 183
-- Name: boards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: maylandertamas
--

ALTER SEQUENCE boards_id_seq OWNED BY boards.id;


--
-- TOC entry 186 (class 1259 OID 17481)
-- Name: cards; Type: TABLE; Schema: public; Owner: maylandertamas
--

CREATE TABLE cards (
    id integer NOT NULL,
    title character varying(80),
    status character varying(20),
    boards_id integer
);


ALTER TABLE cards OWNER TO maylandertamas;

--
-- TOC entry 185 (class 1259 OID 17479)
-- Name: cards_id_seq; Type: SEQUENCE; Schema: public; Owner: maylandertamas
--

CREATE SEQUENCE cards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE cards_id_seq OWNER TO maylandertamas;

--
-- TOC entry 2172 (class 0 OID 0)
-- Dependencies: 185
-- Name: cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: maylandertamas
--

ALTER SEQUENCE cards_id_seq OWNED BY cards.id;


--
-- TOC entry 182 (class 1259 OID 17423)
-- Name: users; Type: TABLE; Schema: public; Owner: maylandertamas
--

CREATE TABLE users (
    id integer NOT NULL,
    username character varying(80),
    password character varying
);


ALTER TABLE users OWNER TO maylandertamas;

--
-- TOC entry 181 (class 1259 OID 17421)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: maylandertamas
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO maylandertamas;

--
-- TOC entry 2173 (class 0 OID 0)
-- Dependencies: 181
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: maylandertamas
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- TOC entry 2033 (class 2604 OID 17471)
-- Name: id; Type: DEFAULT; Schema: public; Owner: maylandertamas
--

ALTER TABLE ONLY boards ALTER COLUMN id SET DEFAULT nextval('boards_id_seq'::regclass);


--
-- TOC entry 2034 (class 2604 OID 17484)
-- Name: id; Type: DEFAULT; Schema: public; Owner: maylandertamas
--

ALTER TABLE ONLY cards ALTER COLUMN id SET DEFAULT nextval('cards_id_seq'::regclass);


--
-- TOC entry 2032 (class 2604 OID 17426)
-- Name: id; Type: DEFAULT; Schema: public; Owner: maylandertamas
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- TOC entry 2160 (class 0 OID 17468)
-- Dependencies: 184
-- Data for Name: boards; Type: TABLE DATA; Schema: public; Owner: maylandertamas
--

COPY boards (id, title, user_id) FROM stdin;
5	test1	1
6	test2	1
\.


--
-- TOC entry 2174 (class 0 OID 0)
-- Dependencies: 183
-- Name: boards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: maylandertamas
--

SELECT pg_catalog.setval('boards_id_seq', 6, true);


--
-- TOC entry 2162 (class 0 OID 17481)
-- Dependencies: 186
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: maylandertamas
--

COPY cards (id, title, status, boards_id) FROM stdin;
1	testcard	in-progress	5
2	testcard2	done	6
\.


--
-- TOC entry 2175 (class 0 OID 0)
-- Dependencies: 185
-- Name: cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: maylandertamas
--

SELECT pg_catalog.setval('cards_id_seq', 2, true);


--
-- TOC entry 2158 (class 0 OID 17423)
-- Dependencies: 182
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: maylandertamas
--

COPY users (id, username, password) FROM stdin;
1	user1	pass
\.


--
-- TOC entry 2176 (class 0 OID 0)
-- Dependencies: 181
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: maylandertamas
--

SELECT pg_catalog.setval('users_id_seq', 1, true);


--
-- TOC entry 2038 (class 2606 OID 17473)
-- Name: boards_pkey; Type: CONSTRAINT; Schema: public; Owner: maylandertamas
--

ALTER TABLE ONLY boards
    ADD CONSTRAINT boards_pkey PRIMARY KEY (id);


--
-- TOC entry 2040 (class 2606 OID 17486)
-- Name: cards_pkey; Type: CONSTRAINT; Schema: public; Owner: maylandertamas
--

ALTER TABLE ONLY cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (id);


--
-- TOC entry 2036 (class 2606 OID 17431)
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: maylandertamas
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2041 (class 2606 OID 17474)
-- Name: boards_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maylandertamas
--

ALTER TABLE ONLY boards
    ADD CONSTRAINT boards_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- TOC entry 2042 (class 2606 OID 17487)
-- Name: cards_boards_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maylandertamas
--

ALTER TABLE ONLY cards
    ADD CONSTRAINT cards_boards_id_fkey FOREIGN KEY (boards_id) REFERENCES boards(id);


--
-- TOC entry 2169 (class 0 OID 0)
-- Dependencies: 6
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2017-06-27 12:09:32 CEST

--
-- PostgreSQL database dump complete
--

