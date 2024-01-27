SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.5 (Ubuntu 15.5-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at") FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") FROM stdin;
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."instances" ("id", "uuid", "raw_base_config", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_factors" ("id", "user_id", "friendly_name", "factor_type", "status", "created_at", "updated_at", "secret") FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_challenges" ("id", "factor_id", "created_at", "verified_at", "ip_address") FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_providers" ("id", "resource_id", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_providers" ("id", "sso_provider_id", "entity_id", "metadata_xml", "metadata_url", "attribute_mapping", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_relay_states" ("id", "sso_provider_id", "request_id", "for_email", "redirect_to", "from_ip_address", "created_at", "updated_at", "flow_state_id") FROM stdin;
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_domains" ("id", "sso_provider_id", "domain", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: postgres
--

COPY "drizzle"."__drizzle_migrations" ("id", "hash", "created_at") FROM stdin;
1	dc3ac6d44f65b0af1461dcbcbe9d5ba5d12bc11aa74c9152beeabf304d7b71d0	1706001534587
\.


--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--

COPY "pgsodium"."key" ("id", "status", "created", "expires", "key_type", "key_id", "key_context", "name", "associated_data", "raw_key", "raw_key_nonce", "parent_key", "comment", "user_data") FROM stdin;
\.


--
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."teams" ("id", "name", "country", "category", "contact_person", "phone_number", "email", "note", "registered_on", "edit_uuid") FROM stdin;
143	BC Benešov | U12B	CZ	U12B	Iva Králíková	+420774317250	iva.kralikova@hospital-bn.cz	Prosíme vyzvednout na nádraží	2024-01-23	bbae7024-36c3-4ea5-9e96-6a0a91350c38
145	BA Sparta Praha U12 B | U12B	CZ	U12B	Michaela Šobrová	+420731153563	sobrova.michaela@seznam.cz	Dobry den, pokud by to bylo mozne, radi bychom vyuzili ubytovani stejne, jako minuly rok, s nami pojede jeste kategorie U14 B a chteli bychom byt pohromade. Minule jsme byli v hotelu s bazenem kousek od Kauflandu. \n\nPrejinpekny zbytek dne.\n\nMichaela Šobrová	2024-01-23	79ba4df5-2a1c-4a14-8483-e6fca651258e
146	Tus Traunreut | U11 MIX	DE	U11 MIX	Ciocan Oliviu	+491705866560	herlitz_ms@yahoo.com		2024-01-23	a5ae51ca-783e-4d20-af11-8b7ae0089eb0
147	BK Lvice Litoměřice | U14G	CZ	U14G	Anna Svobodová	+420721807521	anca-21@seznam.cz		2024-01-23	4319933d-13af-4cc8-b379-8ac2445b28ce
148	Science City Jena | U12B	DE	U12B	Philip Schuster	+49 1774953428	philipschuster12@gmail.com		2024-01-23	fe91998d-f68c-40fd-bbda-45954ec768a7
149	Science City Jena | U14B	DE	U14B	Matthias Junker	+49 1708270810	u13orga@basketball-jena.de		2024-01-23	50569056-f9ab-4ae5-aa7f-340b1fe46c05
150	Science City Jena | U14B	DE	U14B	Philipp Boose	+49 1739329044	philboose@aol.com		2024-01-23	2b4fc8a4-2f9d-434d-94ab-6e110bb85bdb
151	Science City Jena | U16B	DE	U16B	Oliver Golla	+4917640143298	olivergolla@me.com		2024-01-23	de1c9b9f-8384-42a9-94c3-c918c3d73ad1
152	HESSEN  | U16G	DE	U16G	Eberhard Spissinger	+491726924999	coach.ebi@t-0nline.de		2024-01-23	4191548e-4439-475c-94c8-4f2d4095aa08
154	USK Praha | U14B	CZ	U14B	Roger Robson	+420776092281	rwrobson@gmail.com		2024-01-24	0d8a45c4-88a9-4566-b4dc-409e39f4cc5f
155	Virtus Verbania | U14B	IT	U14B	Stefano Montani	+393407638544	montani@virtusverbania.it		2024-01-24	99b398c0-921c-41ed-80ed-cd72ccdd657c
156	BK Sojky Pelhřimov | U14G	CZ	U14G	Jaroslava Jirsová	+420721231631	jaroslava.jirsova@generaliceska.cz	Po loňských vynikajících zkušenostech, moc prosíme o ubytování v penzionu Poprda. A kdyby byl pro nás trenéry opět k dispozici apartmán v podkroví, bylo by to úplně super. Předem moc děkujeme :-)	2024-01-24	086cdea9-36e8-415d-96d3-eb539ca4fe13
157	BCM Sokolov | U14G	CZ	U14G	Miroslav Makovička	+Česko777167324	makovicka@statek-bernard.cz	S panem Křiváčkem bychom měli mít domluvené ubytování na Poprdě. 	2024-01-24	3247066d-33fd-4813-be13-e500f8cfa816
158	Sokol Dubeč | U12B	CZ	U12B	Richard Beneš	+420606617445	richard.benes111@gmail.com	Doufáme, že čas příjezdu v 10:30 je OK vzhledem k připravovanému rozpisu turnaje (vlak odjíždí v 8hod z Prahy). Pokud by zápasy začínaly dříve, pak musíme přijet o den dříve, ale zase se zvýší náklady pro rodiče za další noc v hotelu/pensionu, což bych nepreferoval. 	2024-01-24	7fa299a6-2010-4c27-9ca3-93f7d39cd2f6
159	BK Lvice Litomerice | U16G	CZ	U16G	Rudolf Šotnar	+420724021626	sotbasket@seznam.cz		2024-01-24	ff9c7565-8bda-4abc-97f8-9b1c776fcb13
160	Rockets | U12B	DE	U12B	Krautwald, Peter	+4915117048955	peter.krautwald@big-gotha.de		2024-01-24	4ce525be-c057-4b67-a6e7-034da89e11cf
161	Rockets | U14B	DE	U14B	Krautwald, Peter	+4915117048955	peter.krautwald@big-gotha.de		2024-01-24	90c603c0-2dd0-482d-9975-f4e03e717aa8
162	Rockets | U16B	DE	U16B	Krautwald, Peter	+4915117048955	peter.krautwald@big-gotha.de		2024-01-24	7ea2763d-6907-4541-a678-d9cf1675beb0
163	BK Klatovy | U14G	CZ	U14G	Lucie Čmejlová	+Česko776736946	votrubcova@gmail.com		2024-01-24	e24ec92a-e143-40dc-88dc-fcf642635b4e
164	BK Klatovy | U16B	CZ	U16B	Ing.Svojanovský Jindřich	+00420724369038	jindra.svojan@seznam.cz	Domácí tým	2024-01-26	a6b743af-b36f-4ddc-afef-38d74e006582
165	Slavoj BK Litoměřice  | U14B	CZ	U14B	Daribol Kouba	+Česko702 140 707 	dkouba@slavojbklitomerice.cz	Možná také přihlásíme mladší kluky, kategorii U11B.\n\nDěkujeme..	2024-01-26	9e4a85b9-24cf-47e1-82c5-7769c6192778
166	BC Benešov | U14B	CZ	U14B	Michal Mařík	+Česko604995075	marik.michal01@gmail.com	Přesný čas příjezdu a způsob dopravy ještě neznáme a popř.upravíme podle začátku turnaje a ubytování.	2024-01-26	2138009f-b28e-48ec-a988-d6dc4738b0fd
167	Freak City Academy Bamberg | U12B	DE	U12B	Tim Sauer	+491607250602	mail@tim-sauer.com		2024-01-26	c4b20452-a6b0-4490-bc30-9daf04807a58
\.


--
-- Data for Name: catering_order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."catering_order" ("id", "team_id", "thu_breakfast", "thu_lunch", "thu_dinner", "fri_breakfast", "fri_lunch", "fri_dinner", "sat_breakfast", "sat_lunch", "sat_dinner", "sun_breakfast", "sun_lunch", "halal_count", "vegetarian_count", "other_allergy_count", "other_allergy_note", "sun_dinner", "lactose_free_count", "gluten_free_count") FROM stdin;
107	143	0	0	18	18	18	18	18	18	18	18	18	0	0	0		0	0	0
109	145	17	17	17	17	17	17	17	17	17	17	17	0	0	0		0	1	2
110	147	0	0	14	14	14	14	14	14	14	14	14	0	0	0		0	0	0
111	148	12	12	12	12	12	12	12	12	12	12	12	0	0	0		0	0	0
112	149	12	12	12	12	12	12	12	12	12	12	12	0	0	0		0	0	0
113	150	12	12	12	12	12	12	12	12	12	12	12	0	0	0		12	0	0
114	151	12	12	12	12	12	12	12	12	12	12	12	0	0	0		12	0	0
116	154	0	17	17	17	17	17	17	17	17	17	0	0	0	0		0	0	0
117	155	14	14	14	14	14	14	14	14	14	14	0	0	0	0		0	0	0
118	156	0	0	16	16	16	16	16	16	16	16	16	0	0	0		0	0	0
119	157	0	13	13	21	13	13	21	13	13	21	13	0	0	0		0	0	0
120	158	0	15	15	15	15	15	15	15	15	15	15	0	0	0		0	0	0
121	159	0	0	11	11	11	11	11	11	11	11	11	0	0	0		0	0	0
122	160	14	14	14	14	14	14	14	14	14	14	14	0	0	0		0	0	0
123	161	14	14	14	14	14	14	14	14	14	14	14	0	0	0		0	0	0
124	162	14	14	14	14	14	14	14	14	14	14	14	0	0	0		0	0	0
125	165	0	0	15	15	15	15	15	15	15	15	15	0	1	0		0	0	0
126	166	0	0	18	18	18	18	18	18	18	18	18	0	0	0		0	0	0
\.


--
-- Data for Name: email_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."email_list" ("id", "email") FROM stdin;
1364	martin8weber@gmail.com
25	1.bkmi@centrum.sk
26	1.damen@leipziglakers.de
27	11eisman@seznam.cz
28	1309david@seznam.cz
29	2.damen@leipziglakers.de
30	3filom@gmail.com
31	7tomas9@gmail.com
32	a.braznikovas@gmail.com
33	a.cerskus@skm.lt
34	a.grabowiecka@skmzastal.pl
35	a.kretzschmar@basketballverband-sachsen.de
36	a.milonas@skm.lt
37	a.sprung@styria-wohnbau.at
38	a.terzic@mtvkbb.de
39	a.wortmann@gmail.com
40	aangulo@realmadrid.es
41	abteilungsleiter@basketball-freising.de
42	Acummings52010@icloud.com
43	acuryl@gazeta.pl
44	adam.horak2@seznam.cz
45	adammarkus20@gmail.com
46	adela.janakova@seznam.cz
47	admin@kandosport.hu
48	adrian.voinescu@frbaschet.ro
49	agi@szittya.de
50	agostini.basket@gmail.com
51	agustavsson1@me.com
52	aija@lbs.lv
53	ajbbihor@yahoo.com
54	akallaste@inbox.lv
55	alain.ponsaers@skynet.be
56	alainbouttier@hotmail.com
57	aldin.saracevic@hotmail.com
58	aleksander.k@chroma.pl
59	aleksandrovaev-67@mail.ru
60	Alena.Marsanova@seznam.cz
61	ales.svoboda@iaron.cz
62	alexander.schoenhals@heidelberg-basketball.de.de
63	alexander.traxler@gmx.at
64	alexovi192@seznam.cz
65	alexsiegl@gmx.de
66	algbaranauskas@yahoo.com
67	alisa.jsa@gmail.com
68	alise.strausa@liepajassports.lv
69	almir.subasic2@gmail.com
70	alouacherabah20@gmail.com
71	alvils.kaufmanis@inbox.lv
72	anca-21@seznam.cz
73	andras.stefan@sanofi.com
74	andras.vilagos@gmail.com
75	andrea.grazioli@csosrl.it
76	andrea95guadagnin@gmail.com
77	andreas.gschiel@gmx.at
78	andreas.kopp@esv-staffelsee.de
79	andrej.kerestes@financnasprava.sk
80	andrej.peli@gmail.com
81	andrej.trnka@dhl.com
82	andrejka.izakova@gmail.com
83	andres.ottender@ut.ee
84	andris.stelmahs@inbox.lv
85	andrusnoormagi@gmail.com
86	AngelikaWalden@gmx.net
87	anita.bodnar@hunbasket.hu
88	anna.lacinova@gmail.com
89	annabednarova@atlas.sk
90	anne.eklund@tapiolanhonka.fi
91	ante.samac@icloud.com
92	antesmac80@gmail.com
93	anti_kastam@yahoo.gr
94	anton.jahnel@reisswolf.at
95	antoninpistecky@bkusti.cz
96	antsku@gmail.com
97	anunezr@feb.es
98	aph@post.cz
99	arkko@4teams.ee
100	arteplak@centrum.cz
101	arvydas.brazaitis@asrc.lt
102	asnone@libero.it
103	astrid-frey@gmx.at
104	attila.dinnyes70@gmail.com
105	b-ruigrok@home.nl
106	b.hauss@mail.pcom.de
107	b.michalinova@seznam.cz
108	b.weber@buchner.nl
109	babisdano@gmail.com
110	badem12@gmail.com
111	bagrizzliesplzen@gmail.com
112	bakk.istvan777@gmail.com
113	baktakis@yahoo.com
114	bamp@bamp.sk
115	basket.71@mail.ru
116	basket.wanze.ti2017@gmail.com
117	basket.wbcgyor@gmail.com
118	basket@bseu.by
119	basket@mbk-rbk.sk
120	basket@mbkstaratura.sk
121	basketbaljordi@live.nl
122	basketball-nachwuchs@fcb.de
123	basketball.tvm@gmx.de
124	basketball@asv-cham.de
125	basketball@atse-graz.at
126	basketball@basketflames.at
127	basketball@bbc-wolfsberg.net
128	basketball@djk-bamberg.de
129	basketball@fcb.de
130	basketball@mtv-muenchen.de
131	basketball@post-sv.de
132	basketball@sg-weiterstadt.de
133	basketball@svargon.nl
134	basketball@tgw-online.de
135	basketball@tsg-soeflingen.de
136	basketball@tsv-vaterstetten.de
137	basketball@tsv1861-noerdlingen.de
138	Basketball@tv-fuerth-1860.de
139	basketball@usc-leipzig.de
140	basketball@uscfr.de
141	basketball@vfl-waiblingen.de
142	basketcelakovice@centrum.cz
143	basketjicin@basketjicin.cz
144	basketmape@seznam.cz
145	basketrv@gmail.com
146	basketvit@gmail.com
147	basketzdarns@seznam.cz
148	basquet@cbsantjosep.net
149	bbk@szm.sk
150	bbwgs@bbwbasketball.net
151	bcm.sokolov@seznam.cz
152	bcrunabasket@gmail.com
153	bctallinn@gmail.com
154	beac.basket@gmail.com
155	beaksarkanyrita@gmail.com
156	becskyistvan@gmail.com
157	bekesiszsk@freemail.hu
158	ben.schweigert@hakro-merlins.de
159	bencikova.misa@seznam.cz
160	benjamin.schweigert@crailsheim-merlins.de
161	benny28lin@gmail.com
162	beranek.jan@bkhk.cz
163	berenyi.sandorpal@gmail.com
164	berjura@gmail.com
165	bernhard_hofmann@hotmail.com
166	bestuur@bsleiden.nl
167	bestuur@flaxfieldfighters.nl
168	bianca.hausmann@weiden-basketball.com
169	bigbadbraun@googlemail.com
170	birzukrepsinis1@gmail.com
171	bjss3@riga.lv
172	bk.domazlice@seznam.cz
173	bk.klokani@post.sk
174	bk.koszela@gmail.com
175	bk.zslendak@gmail.com
176	bkeilat@centrum.sk
177	bkgdse@gmail.com
178	bkm.nitra@gmail.com
179	bkm.piestany@gmail.com
180	bkm@bkm.sk
181	bkmbardejoc@centrum.sk
182	bkmbardejov@centrum.sk
183	bkmpiestany@gmail.com
184	bkmzilina@gmail.com
185	bkslovan@bts.sk
186	bksojky@seznam.cz
187	blf@t-online.hu
188	blungwitz@googlemail.com
189	BmoreMused@gmail.com
190	bnyaiviktor@gmail.com
191	bo.ta@seznam.cz
192	boban.markija@gmail.com
193	bode@ts-jahn-basketball.de
194	bode@tsjb.de
195	bohus@bkdetva.sk
196	bojan.hladnik@gimb.org
197	bonej@volny.cz
198	borth@centrum.sk
199	borut_fijavz@yahoo.com
200	brano.balvan@jdsoftware.sk
201	briedis.alvis@inbox.lv
202	bruno.picardi@ldrbasket.it
203	bruno1986@inbox.lv
204	bsc@bscbratislava.sk
205	bskriga@riga.lv
206	bublinkavera@centrum.cz
207	budafokbasket@gmail.com
208	budenas.algirdas@gmail.com
209	burda.pav@gmail.com
210	butans33@gmail.com
211	bvfairmount@hotmail.com
212	c.giscou@wanadoo.fr
213	carinthianbroncos@aon.at
214	cebakjiri@gmail.com
215	cechy.7@seznam.cz
216	cedrickoppen@hotmail.com
217	cegledikosar@invitel.hu
218	centras@asrc.lt
219	cero74@gmail.com
220	championkiev@ukr.net
221	chantal_heinen@hotmail.com
222	chefin@48er-basketball.de
223	chmela.basket@seznam.cz
224	christian.egger79@gmail.com
225	christian.meichsner@chemnitz99.de
226	christian@basketballdoebling.at
227	christoph.friedrich@voitsberg-devils.at
228	christoph.hempel@leipzig-lakers.de
229	christopher.poehl@orf.at
230	cipasport@hotmail.com
231	cjsecretaris@gmail.com
232	claussieghoertner@web.de
233	cmejrek@sportgym.cz
234	coach.ebi@t-online.de
235	coach@ritzbball.de
236	coachionescu@gmail.com
237	coachionescu@yahoo.com
238	coachniedbalski@gmail.com
239	corina.kollarovics@bbv-online.de
240	csaba.nyiri14@gmail.com
241	csaba.vladar@uni-corvinus.hu
242	csunderlik@seznam.cz
243	cuic_branko@yahoo.com
244	cvrndamilan@seznam.cz
245	d.zach@seznam.cz
246	dadaimberger@gmail.com
247	dalibor.paluda@seznam.cz
248	dalimil@seznam.cz
249	damen-weiden-neustadt@web.de
250	dan.kurucz@seznam.cz
251	danaslamkova14@gmail.com
252	dani.schmid@esv-staffelsee.de
253	daniel.curka@cofely.sk
254	daniel.curka@gmail.com
255	Danijel@basketball-psk.de
256	danny_e12@yahoo.de
257	dante.flojo@gmail.com
258	darazsak@darazsak.hu
259	darnaiz@freemail.hu
260	darryl.siegel@iba-munich.com
261	dataeconomy@volny.cz
262	david.mlady@gmai.com
263	david.streubel@basketjicin.cz
264	david.vasicek@dumum.cz
265	david.vyplel@seznam.cz
266	david17horak@email.cz
267	davorskara@yahoo.com
268	dawgystyle23@gmail.com
269	dawid@dawidmazur.com
270	deackft@unideb.hu
271	deaddog@gmx.de
272	debacker.nancy@basketbelgium.be
273	dejabasket@yahoo.co.uk
274	dejan.lekic@basketball.org.mk
275	delta@deltabasket.sk
276	denisa.zambova@gmail.com
277	dennis.pihl@gmail.com
278	dewitrosmalen@planet.nl
279	dhroudna@volny.cz
280	diana_aldan@mail.ru
281	Diana.Kratochvilova@seznam.cz
282	dianakuzina@inbox.lv
283	dieter@basketball-ansbach.de
284	divinebasketball@gmail.com
285	djanson@inbox.lv
286	djbarthell127@gmail.com
287	djkneustadt@web.de
288	djurajdova@seznam.cz
289	dkks.kosar@gmail.com
290	dkouba@slavojbklitomerice.cz
291	doleschall.miklos@mafcbasket.hu
292	dombovarikosarsuli@gmail.com
293	domca.benesova@seznam.cz
294	dovcikovakatarina@gmail.com
295	dpmelicor@yahoo.com
296	dr.baldauf@aon.at
297	dr.elekandras@t-online.hu
298	drgon.milos@gmail.com
299	dubovan@tiscali.cz
300	e.kiefer@kabsi.at
301	e.mozes@freemail.hu
302	e.stuivenberg@wxs.nl
303	eberhardspissinger@gmail.com
304	edijs@lbs.lv
305	edmund-zimmermann@web.de
306	edvinas.adomaitis@gmail.com
307	edwardvasiliuk@gmail.com
308	eero.leva@hnmky.fi
309	egeozisik@gmail.com
310	egidijusv08@gmail.com
311	egrikok@gmail.com
312	eimantas@alpi.lt
313	eisman@bkloko-plzen.cz
314	ekkehart-jaeger@web.de
315	ekomac@ekomac.sk
316	elenavik95@mail.ru
317	elias.tuomisto@cassidian.com
318	elita.plataca@liepajassports.lv
319	elnok@nyikse.hu
320	elsport@nyiregyhazisc.hu
321	Email
322	emmojo@gmail.com
323	emreatsur@gmail.com
324	eretnek.janos@gmail.com
325	eri@eri.bts.sk
326	erikaveberova@seznam.cz
327	erikmae@hotmail.com
328	ets@etseu.eu
329	eva.vilhumova@seznam.cz
330	evaantosova@seznam.cz
331	evavilhumova@seznam.cz
332	evkor7@mail.ru
333	ewald.puchner@weiz.at
334	eybl.eybl@gmail.com
335	ezerzeme21@inbox.lv
336	f.neunteufel@gmx.net
337	f.poell@chello.at
338	f.sand@bcwi.de
339	fadi.sabbah@aramex.com
340	falco@falcokc.t-online.hu
341	farkasinszki@farkasinszkikft.hu
342	fatih.altunbulak91@googlemail.com
343	federatia@frbaschet.ro
344	felix.boeckel@basketball-jena.de
345	feniks2010@yahoo.com
346	filip.svandrlik@centrum.cz
347	filip@kastanek.cz
348	filipova.eva1@seznam.cz
349	florian.wedell@fcb.de
350	fogarasi.gyorgy@tf.hu
351	foltyn.r@volny.cz
352	forst.vaclav@centrum.cz
353	frank@merssmann.de
354	franova@pmdp.cz
355	fransol@centrum.sk
356	frantisek.koller@gmail.com
357	franz_theuermann@yahoo.de
358	franz.chwatal@ubbc-gmuend.at
359	franz.rupprecht@fcbayern.com
360	franz.ueberall@t-online.de
361	franziska.bicker@albaberlin.de
362	fred.sinai@chello.at
363	fredrik.joulamo@me.com
364	frey@swissbasketball.ch
365	friedl.miroslav@hydac.cz
366	friedrich.lasser@gmail.com
367	fuhrmann@post-sv.de
368	g.melderis@gmail.com
369	g.oliskevicius@gmail.com
370	g.racic@basket2000.com
371	g.ritstier@cbvbinnenland.nl
372	g.sanadze@gbf.ge
373	g.siegl@t-online.de
374	g.soetekouw@dji.minjus.nl
375	gabijanovska@seznam.cz
376	galaxy@cargorent.hu
377	ganiyu.noibi@hotmail.de
378	garaleas.stefan@basketbelgium.be
379	gasper.kravanja@gmail.com
380	geraska2007@mail.ru
381	gerhard.brodnig@a1.net
382	geriori@gmail.com
383	gerry.urbina@outdoorurbantransit.com
384	geschaeftsstelle@bc-marburg.de
385	geschaeftsstelle@crailsheim-merlins.de
386	geschaeftsstelle@sgk-basketball.de
387	geschaeftsstelle@svm-basketball.de
388	geschwinderova.iva@seznam.cz
389	gestioebc@gmail.com
390	gluosnis@telesat.lt
391	gm@londonunited.eu
392	gmarciak@o2.pl
393	goran.skobalj6@gmail.com
394	gosko@seznam.cz
395	gottfried.deutschmann@utanet.at
396	grandger9090@bk.ru
397	gsklenarikova@seznam.cz
398	guenter.zinner@chello.at
399	guenther.stagat@t-online.de
400	guido.de.ridder@pandora.be
401	gunther.abel@gmx.net
402	gurbuz@seznam.cz
403	gyarmati.istvan40@gmail.com
404	gyulaicolor@gmail.com
405	gztm126@gmail.com
406	h.dietl@eduhi.at
407	h.kneizys@gmail.com
408	hakamaatimo@hotmail.com
409	halmain01@gmail.com
410	hannes.rohrboeck1@chello.at
411	hanusek.marek@azet.sk
412	Hanzalek@web.de
413	Harald.borst@t-online.de
414	harri.jokela@phyk.fi
415	harri@basket.ee
416	havlicek@smansped.cz
417	hbbasket@hbbasket.cz
418	hbvthejumpers@live.nl
419	heikki.tiilikainen@steveco.fi
420	heikohering@online.de
421	heindl_hippo@yahoo.com
422	heinz.brandl@rlb-stmk.raiffeisen.at
423	heinz.gaisrucker@reflex.at
424	helbasket@basket.gr
425	helmut.niederhofer@aon.at
426	hema71@freemail.hu
427	herbst@tsv1860-basket.de
428	herlitz_ms@yahoo.com
429	herman.peter@inseko.sk
430	heroman11@gmail.com
431	hessenauer@tsjb.de
432	hettingtessy@yahoo.de
433	hiilinen@gmail.com
434	hjozsi@bdeg.hu
435	hlavp@seznam.cz
436	hockova@maspoma.cz
437	honved@honved.hu
438	hoogeland77@planet.nl
439	horvatho@arsc.hu
440	hradilka11@gmail.com
441	hriv@seznam.cz
442	husajda@seznam.cz
443	icoach4dakids@gmail.com
444	ifjhajdupeter@gmail.com
445	igor.hollander@gmail.com
446	igor.jendruch@gmail.com
447	igortrpeski@yahoo.com
448	ihogye@jkse.hu
449	ilangi@radnoti-szeged.sulinet.hu
450	ilia.brazhnikov@gmail.com
451	ilze@imsports.lv
452	imantsplavins@inbox.lv
453	ime11@ukr.net
454	imre@szittya.de
455	indrek@rim.ee
456	inesedegterjonoka@inbox.lv
457	info@abcteraar.nl
458	info@akkermansauctions.com
459	info@almerepioneers.nl
460	info@amstetten-falcons.at
461	info@aska.lt
462	info@basket-feldkirchen.at
463	info@basketball-jena.de
464	info@basketball-usv.de
465	info@basketball-wasserburg.de
466	info@basketball-weinheim.de
467	info@bbf.by
468	info@bbz-opladen.de
469	info@breakstars.nl
470	info@cekk.hu
471	info@challengesports.nl
472	info@chemcats.de
473	info@cobranova.nl
474	info@csabakosar.hu
475	info@dbak.cz
476	info@dbbf.dk
477	info@denhelderbasketball.nl
478	info@dragons.hu
479	info@erikakliem.de
480	info@herner-turn-club.de
481	info@herzobasket.de
482	info@htg-badhomburg.de
483	info@jkksc.lt
484	info@kasaule.lt
485	info@kastos.cz
486	info@klaipedoskrepsinis.lt
487	info@krepsinioakademija.lt
488	info@krepsiniomokykla.lt
489	info@kscszekszard.hu
490	info@mabel-sport.hu
491	info@mafcbasket.hu
492	info@mazeikiusportomokykla.lt
493	info@mtv-giessen.de
494	info@n-bc.de
495	info@oskolomouc.cz
496	info@punch-basketball.nl
497	info@pvsk-panthers.hu
498	info@rotterdambasketbal.nl
499	info@rotterdamzuid.com
500	info@saboniocentras.lt
501	info@skm.lt
502	info@skyliners.de
503	info@sportpalanga.lt
504	info@swissbasketball.ch
505	info@szolnokiolaj.hu
506	info@tornadas.lt
507	Info@towers-basketball.de
508	info@tsv-gruenberg.de
509	info@tsv1865dachau.de
510	info@tsve.de
511	info@ttl-basketball-bamberg.de
512	info@tv1860hofheim.de
513	info@ubbc-herzogenburg.at
514	info@uelzen-baskets.de
515	info@ukrbasket.net
516	info@usv-halle-basketball.de
517	info@vilniauska.lt
518	info@vilniauskrepsiniomokykla.lt
519	info@wat20.at
520	info@westlandstars.nl
521	infocbtorello@gmail.com
522	ing.schmid@hotmail.com
523	ingunamarkune@inbox.lv
524	ippsza@gmail.com
525	irenegentini@hotmail.it
526	irinarus2011@mail.ru
527	iroda@ase.hu
528	iroda@kaszasok.hu
529	iroda@oselions.hu
530	iroda@peacpecs.hu
531	iroda@petofise.eu
532	iskra@iskrasvit.sk
533	isongailiene@gmail.com
534	issakov2005@mail.ru
535	istvan_19@freemail.hu
536	isv-kameleon@hetnet.nl
537	iva.kralikova@hospital-bn.cz
538	iva.stenclova@seznam.cz
539	ivandemian@hotmail.sk
540	ivanovic@kss.rs
541	ivanvojtko@gmx.de
542	ivanvojtko@seznam.cz
543	ivcapkovi@tiscali.cz
544	iveta.casno@riga.lv
545	iveta.raskova@seznam.cz
546	ivka.hricinova@gmail.com
547	ivo.castek@dpb.cz
548	izvrsni.direktor.kkgrosuplje@gmail.com
549	j.jankauskas@skm.lt
550	j.l.westerhof@hotmail.com
551	j.panak@slovakbasket.sk
552	j.sedmajs@seznam.cz
553	j.vanrootselaar@quicknet.nl
554	jajka@infos.cz
555	jakub.janus12@gmail.com
556	jakub.muzik@centrum.cz
557	jakub.urbanowicz@mg13.com.pl
558	JakubMaly@atlas.cz
559	jan.heidrich@seznam.cz
560	jan.jebavy@agroservisjas.cz
561	jan.jobb@zf.com
562	jan.kozina1@gmail.com
563	jan.pragr@uskpraha.cz
564	jan.schmidt-baese@fcb.de
565	Jan.slowiak@oldrichov.cz
566	jan@basketball-psk.de
567	jana.oravcova@phoenix.sk
568	janakova.adela@seznam.cz
569	janastarostkova@seznam.cz
570	janda@gymstr.cz
571	jandlabik@gmail.com
572	jankantiene7@gmail.com
573	jankou@pobox.sk
574	jankrivacek@mlt.cz
575	jannepattikangas@hotmail.com
576	japas13@yahoo.com
577	jarmila.tyllerova@seznam.cz
578	jaroslav.skapinec@oake.sk
579	jaroslava.jirsova@generaliceska.cz
580	jb@mission-hr.nl
581	jbbv.kobersdorf@gmx.at
582	jelinek@bkzabiny.cz
583	jenik.pragr@seznam.cz
584	Jens.Grube@chemcats.de
585	jens.schneider@basketball-bund.de
586	jenskuenze@primacom.net
587	jeugd@cangeroes.nl
588	jeugdcommissie@tenderfeet.nl
589	jfi@imagesol.de
590	jhorvath009@gmail.com
591	jibbedegoede@hotmail.com
592	jindra.svojan@seznam.cz
593	jindramartin@volny.cz
594	jipospisil@csob.cz
595	jiri.hofirek@centrum.cz
596	jirka.fiala@centrum.cz
597	jirkahy@seznam.cz
598	jiznisupi@seznam.cz
599	jkse@jkse.hu
600	jlovik@azet.sk
601	jm.mb@seznam.cz
602	jml@eurasianequity.com
603	joachim.buggelsheim@gmx.net
604	jochen.buschke@basketball-bund.de
605	jochen.junior@web.de
606	jochen.michels@basketball-loewen.com
607	jochen.schellekens@gmail.com
608	joniskiosc@gmail.com
609	jonkksc2002@gmail.com
610	joris.grootjans@telenet.be
611	josefgaida@t-online.de
612	josefprettl@seznam.cz
613	jozef.istok@sbkjunior.sk
614	jozef@tlaciarenkezmarok.eu
615	jrobek@seznam.cz
616	jsemhappy@centrum.cz
617	jsitar@post.cz
618	judith.hopf@web.de
619	jugend.slamajama@web.de
620	jugend@basketball-ulm.com
621	jugend@basketball-wasserburg.de
622	jugend@bbc-bayreuth.de
623	jugend@leipziglakers.de
624	jugend@sbr-basketball.de
625	jugendreferent@mittelfrankenbasket.de
626	jugendtrainer@ts-durlach.de
627	Jugendwarte@bg-Bonn.de
628	jukka.pelkonen@penope.fi
629	juniorbasket@juniorbasket.sk
630	junkovarada@seznam.cz
631	jurbarkosportas@gmail.com
632	justinschluenken@yahoo.com
633	k.e.r.n@web.de
634	k.kohoutova@barentz.cz
635	k.olimp2005@yandex.ru
636	kaan@tom-travel.de
637	kaarel.loigu@gmail.com
638	kadiskk@gmail.com
639	kai.tzschentke@brosebamberg.de
640	kaire66asi@gmail.com
641	kaitzschentke@web.de
642	kalabzap@seznam.cz
643	kalian78@mail.ru
644	kalle.hakanson@tbwa.se
645	kalle.kollin@mail.ee
646	kalvarijos.sc@gmail.com
647	kamil.fajta@seznam.cz
648	kamil.hrncar@iljinslovakia.sk
649	Kamil.vajda@seznam.cz
650	kanizsadkk@chello.hu
651	KarelA18@seznam.cz
652	karelzalesky@seznam.cz
653	karin@die-familie-klug.de
654	karl.kraftel@gmx.at
655	karolina.voljanska@seznam.cz
656	karolwimmer1@gmail.com
657	karotom@seznam.cz
658	kaspars.majenieks@gmail.com
659	katerina.dlouha@skoda-auto.cz
660	katerina.hrstkova@centrum.cz
661	katka.1.novakova@gmail.com
662	katona1zoltan@freemail.hu
663	kaunasbs@gmail.com
664	kazlurudossportocentras@gmail.com
665	kecskemetikc.noikosar@gmail.com
666	keio@basket.ee
667	keketeam72@gmail.com
668	kele@sykki.fi
669	Kenneth.Sam-Sin@CookMedical.com
670	kern.elisabeth@ifs.at
671	kern@domenicainterier.sk
672	kerstenannemiek@gmail.com
673	kimmo.pelander@gmail.com
674	kiran.vesper@heidelberg-basketball.de
675	kk.sutjeska@gmail.com
676	kkakmene@gmail.com
677	kkflash.bgd@gmail.com
678	kkmedzik@gmail.com
679	kks.siechnice2010@gmail.com
680	KKSC@kaisiadorys.lt
681	kksc@raseiniai.lt
682	kkvmatrix@gmail.com
683	klaus.rauhansalo@footbalance.com
684	klks@chello.hu
685	klrvjsportom@inbox.lt
686	kmperkunas@gmail.com
687	knoflickova.v@seznam.cz
688	kochny@seznam.cz
689	kocki@azet.sk
690	kokinoniko@yahoo.com
691	kolosjakub@gmail.com
692	koltunovdima@mail.ru
693	kominictvisvecar@seznam.cz
694	konczol.attila@t-online.hu
695	korb@basketball-friedenau.de
696	korinekzd53@gmail.com
697	korpolewski@pozkosz.com
698	kos@basketcb.cz
699	kos@gmx.org
700	kosar04@t-online.hu
701	kosarklub@gmail.com
702	kosarlabda@honved.hu
703	kosarlabda@wb-sopron.com
704	kozak.istvan@freemail.hu
705	kozel@tjloko-plzen.cz
706	kralik@lmbasket.sk
707	kris@abusz.pl
708	kristin05@seznam.cz
709	kristine.zeimute@gmail.com
710	krists.piternieks@gmail.com
711	krivanekpetr8@seznam.cz
712	krnac@biotika.sk
713	krnovskebasketky@gmail.com
714	krupka.ltm@seznam.cz
715	kruszewskimaciej@op.pl
716	krystof.skula@seznam.cz
717	kscg@t-com.me
718	ksm@kedainiai.lt
719	ksustikova@mssk.sk
720	ktekosar@gmail.com
721	ktereza@atlas.cz
722	kucsorka@vipmail.hu
723	kuehlwein.flo@googlemail.com
724	kuenze@posteo.de
725	kuklova15@gmail.com
726	kupiskiosportocentras@gmail.com
727	kursenusm@gmail.com
728	kurt.dambauer@dambauer.at
729	kzs@kzs.si
730	l.grabauskas@skm.lt
731	l.shtamere@gmail.com
732	lada.smaha@seznam.cz
733	ladahejl@seznam.cz
734	ladislav.belik@gmail.com
735	laluska@sol.cc.u-szeged.hu
736	larry.oreilly@hse.ie
737	larryvondra@centrum.cz
738	lars@rzymianowicz.de
739	lars@tsjb.de
740	laura.knufinke@bg-rheinstars-koeln.de
741	lauri.kotkaslahti@edu.hel.fi
742	laxa69@inbox.lv
743	lbs@lbs.lv
744	ldonker@chello.nl
745	leden@sbv-juventus.nl
746	legofav@hotmail.com
747	lejsekj@bkloko-plzen.cz
748	lejsekj@email.cz
749	Lejsekj@seznam.cz
750	leldeberzina90@gmail.com
751	lenicka.basket@centrum.cz
752	lenka.tercova@gmail.com
753	lepsenyi.adam@hunbasket.hu
754	lgabina@seznam.cz
755	lidija.pleic@hks-cbf.hr
756	liepajasbs@apollo.lv
757	ligaalilujeva@inbox.lv
758	limarek@seznam.cz
759	linciam@gmail.com
760	lisa.d.phelps.ctr@mail.mil
761	liva.lauberte@saldus.lv
762	liwa@chello.at
763	loikosasha@mail.ru
764	loramski@gmail.com
765	lprantl@basketball-wasserburg.de
766	lsklienka@gmail.com
767	Lub70@seznam.cz
768	lubogabriz@centrum.sk
769	lubomir.begani@szm.sk
770	lubomir.bucko@st.sk
771	lubomirvinka.martin@gmail.com
772	lubor.tomanek@mbkkarlovka.sk
773	luborysavy@gmail.com
774	lucia.syckrivanova@gmail.com
775	luciah@deltabasket.sk
776	lucie.cabr@seznam.cz
777	lucie.luxova@pvk.cz
778	ludwik.mc@gmail.com
779	luka.marolt@kklastovka.si
780	lukas.kopecek@email.cz
781	lukasz-rubczynski@o2.pl
782	luxovka11@seznam.cz
783	m.belik@web.de
784	m.dirga@centrum.sk
785	m.hossa@skmzastal.pl
786	m.hostous@seznam.cz
787	m.krapikas@gmail.com
788	m.rackauskas@lbbf.lt
789	m.roth@mtvkbb.de
790	m.seher@gmx.at
791	m.sindlarova@seznam.cz
792	m.vanputten01@upcmail.nl
793	m.vstab@gmail.com
794	maadvd11@gmail.com
795	mach@bkloko-plzen.cz
796	machacek@gmail.com
797	machacek12@gmail.com
798	mafc@mafc.hu
799	mag.steger@gmx.at
800	magdalenasibiga@wp.pl
801	mahla@email.cz
802	maijakublina@inbox.lv
803	mail@christiangepp.at
804	makovicka@statek-bernard.cz
805	malevsc@t-online.hu
806	malinka_9090@mail.ru
807	mantas.lauraitis@gmail.com
808	mantasilgunas@gmail.com
809	Marcel.Trowe@hotmail.de
810	marcelhiadlovsky@centrum.sk
811	marchenkonv@mail.ru
812	marco.lucac@libero.it
813	marconicoletti23@gmail.com
814	marek_bulik@hotmail.com
815	marek.kos@1kdesign.cz
816	marekjur@centrum.sk
817	marga.riedelsheimer@online.de
818	mari.kasvio@gmail.com
819	mariafinta.mse@gmail.com
820	marian.chovanec.mch@gmail.com
821	marian.nemcek89@gmail.com
822	marianf@tjloko-plzen.cz
823	marianne.jongsma@nbb.basketball.nl
824	marion.dzubba@bbw-bezirk3.de
825	marita.pulla@lspa.lv
826	marius.huth@albaberlin.de
827	marketa.loflerova@seznam.cz
828	marketa.mali@email.cz
829	marketa.zavrelova@seznam.cz
830	marko.kylmala@kymp.net
831	marko.samec@dinocolor.si
832	marko.woytowicz@fcb.de
833	markoparkonen@hot.ee
834	markova.helena@volny.cz
835	markus.gretz@halle-lions.de
836	marlondevrij@woodyblues.nl
837	marshel91@inbox.lv
838	mart.schneider@gmail.com
839	mart@sknord.ee
840	martin_aimet@aon.at
841	martin.bartos@skbd.sk
842	martin.bland@englandbasketball.co.uk
843	martin.jecha@seznam.cz
844	martin.modr@post.cz
845	Martin.schmiedt@seznam.cz
846	martin@basketball-salzburg.at
847	martina.moravc@gmail.com
848	martinbake@seznam.cz
849	martinmarkvart@seznam.cz
850	masakaminen@hotmail.com
851	mate1020@freemail.hu
852	mateusz.pietkiewicz@assecogdynia.pl
853	mats.elsnitz@gmail.com
854	matt.vesely@seznam.cz
855	matteo.picardi@ldrbasket.it
856	matthew.dodson@bg-rheinstars-koeln.de
857	matthias.barth@tsg-markkleeberg.de
858	matulaitisgediminas@yahoo.com
859	matys789@centrum.cz
860	Mauriceschuivens@kpnplanet.nl
861	maximilian.allert@gmail.com
862	mazak.cz@seznam.cz
863	mb.aso@stonline.sk
864	mc.curcio@fip.it
865	mcoeymans@lrc.nl
866	meafc@meafc.hu
867	melistreblova@seznam.cz
868	merabsona@yahoo.com
869	merel_nr15@hotmail.com
870	merkulievajulia@mail.ru
871	meszaros.istvan@honved.hu
872	mezoberenyikosarlabdaklub@gmail.com
873	mgabriel@post.cz
874	michael_wiegand@arcor.de
875	Michael.Ball@oaklands.ac.uk
876	michael.kuncic@gmx.at
877	michaela.decker@web.de
878	michaela.demeckova@gmail.com
879	michaela.fuhrmann@t-online.de
880	michaelaivanova12@seznam.cz
881	michal.feter@szkolagortata.pl
882	michalkovapetra@seznam.cz
883	michele.catalani@ymail.com
884	micnep@seznam.cz
885	milan.horak@sportovnitrenink.cz
886	milankrasznai8@gmail.com
887	milansustik@gmail.com
888	milorad.cakara@gmx.at
889	miloskreth@atlas.sk
890	miloslav.sipek@seznam.cz
891	mindaugas@vilast.lt
892	minom14@gmail.com
893	mioara.iurian@yahoo.com
894	miro.saraz@centrum.sk
895	miroslav.chudik@gmail.com
896	miroslav.janovsky@zstylova.cz
897	miroslav.vondricka@seznam.cz
898	mis_eri@gmx.at
899	misaferbasova@gmail.com
900	misinsky@juniorbasket.sk
901	mkaresz91@gmail.com
902	mkklass@gmail.com
903	mkoitla@hotmail.com
904	mkuci@atlas.cz
905	mladez@bkusti.cz
906	mladez@bkzabiny.cz
907	mm.majersky@gmail.com
908	mm1313@blog.lt
909	mojx82@gmail.com
910	mokriska@azet.sk
911	mokykla@sportas.kretinga.lm.lt
912	mondscheinp@gmail.com
913	monika.mikusova@gmail.com
914	monika.repaszka@gmail.com
915	montani-stefano@alice.it
916	montani@virtusverbania.it
917	mp-dejong@hotmail.com
918	mpipta@dbak.cz
919	mrydl@atlas.cz
920	mspiner17@hotmail.com
921	mtamolis@lcc.lt
922	mte@bckormend.hu
923	mtk@mtk1888.hu
924	muditezandere@inbox.lv
925	mukicpojat@outlook.com
926	mvszse@mail.datanet.hu
927	mzatkuliakova@gmail.com
928	n-demina@bk.ru
929	nadovci@ktnet.cz
930	nadovci@seznam.cz
931	nady.basket.by@mail.ru
932	nagorna61@ukr.net
933	nagy.frantisek.slovakia@gmail.com
934	nagy.otto@upcmail.hu
935	nagy88daniel@gmail.com
936	nagyova.alexandra@gmail.com
937	nandor.simon@hotmail.com
938	natal-zhili@yandex.ru
939	natalia_brest15@mail.ru
940	natico21@walla.co.il
941	naty.kunclova@gmail.com
942	naumann_co@yahoo.de
943	navickasrimas@gmail.com
944	nblanc@basketfrance.com
945	nemas.linas@gmail.com
946	nemeckovamartina1@seznam.cz
947	nespors@inbox.lv
948	neusiedlerstorks@gmail.com
949	nevasport2@mail.ru
950	nevgurep@yandex.ru
951	newbasket@hotmail.com
952	newstarssecretaris@hotmail.nl
953	nicholas.behne@albaberlin.de
954	nico.dlk@gmx.de
955	niklas.schoettke@huerther-bc.de
956	niko.nyholm@tapiolanhonka.fi
957	Nikola.Smolcnopova@seznam.cz
958	nkelzenberg@web.de
959	nmate90@gmail.com
960	noortesport@audentes.ee
961	nora@basketball.bg
962	norbert.opitz@albaberlin.de
963	novakivo@centrum.cz
964	novotnymirek@gmail.com
965	nunomanaia@fpb.pt
966	o.permisan@mtvkbb.de
967	oci.p@centrum.cz
968	office@basket.fi
969	office@basketballaustria.at
970	office@basketswans.at
971	office@bbu-salzburg.at
972	office@dctimberwolves.at
973	office@ece-bulls.com
974	office@fcn-baskets.at
975	office@guessing-knights.at
976	office@gunners.at
977	office@mitteldeutscherbc.de
978	office@russiabasket.ru
979	office@silverminers.net
980	office@szentesikk.hu
981	office@szte-szedeak.hu
982	office@ukj-mistelbach.at
983	office@westwien.at
984	ojars2@inbox.lv
985	olafk@t-online.de
986	olari.narits@ut.ee
987	olgakubikova@gmail.com
988	olivier.a@veyriersalevebasket.ch
989	ondra.profa@gmail.com
990	ondrus@askinter.sk
991	ondrus16@post.sk
992	orbay.csaba@starjan.hu
993	oreska@kp-reality.sk
994	organizace.basparta@gmail.com
995	otersonsraivo@inbox.lv
996	overhoff@tsv1860-basket.de
997	p.maier@baskets.at
998	p.olka@seznam.cz
999	p.rispler@keypack.cz
1000	p.seidel93@gmx.de
1001	p.trattner@chello.at
1002	p.vlkova.pv@gmail.com
1003	pabudis@yahoo.com
1004	pagacjuraj@gmail.com
1005	pagegiumsm@gmail.com
1006	pakruojosportas@gmail.com
1007	paligabor@megyeritigrisek.hu
1008	panu@sykki.fi
1009	papapdopulos@seznam.cz
1010	papp.zsolt@mafcbasket.hu
1011	paul.krumboeck@kabsi.at
1012	paur.martin@seznam.cz
1013	pavaduotojas@sportas.utena.lm.lt
1014	pavel.stanek@levharti.cz
1015	pavelgola6@gmail.com
1016	pavelsobotka@seznam.cz
1017	pavla.velicka@gmail.com
1018	pavla.velicka@nemosok.cz
1019	pavol.oresky@gmail.com
1020	pbbasket@zoznam.sk
1021	pbieliakoo@gmail.com
1022	pedro.adamec@seznam.cz
1023	pekka.setala@namikalahtijuniorit.fi
1024	pepe@post.cz
1025	Per.Kallman@basket.se
1026	peresztegi.n.akos@gmail.com
1027	peta.baselides@seznam.cz
1028	peter.demian@telekom.sk
1029	peter.herman@inseko.sk
1030	peter23nagy@gmail.com
1031	petereles@hotmail.com
1032	peterka.t@bkberoun.cz
1033	petermazen@hotmail.com
1034	petr.buben9@gmail.com
1035	petr.havli@centrum.cz
1036	petr.jachan@email.cz
1037	petr.nachtmann@bernard.cz
1038	petra.kelecic@cibona.com
1039	petrekrt@seznam.cz
1040	phil-schm@web.de
1041	pinkkpecsi424@gmail.com
1042	piraten@chello.at
1043	pivanovic13@gmail.com
1044	pj.nemcovi@tiscali.cz
1045	pkolacny@gmail.com
1046	pkozak@volny.cz
1047	plavskola@volny.cz
1048	plfjeno@gmail.com
1049	plochr@web.de
1050	pmksz@pmksz.hu
1051	polak.jiri@gcbrod.cz
1052	pop_calinbaschet@yahoo.com
1053	poskuva@gmail.com
1054	pospisil.petr@technikaprodomy.cz
1055	post@big-gotha.de
1056	post@djk-landsberg.de
1057	post@karin-bergdolt.de
1058	press@cibona.com
1059	prichtr@seznam.cz
1060	prienusportas@yahoo.com
1061	ptepeac@gmail.com
1062	pzkosz@pzkosz.pl
1063	r.bardauskas@saboniocentras.lt
1064	r.giedraitiene@gmail.com
1065	r.jambor@ti-basketball.at
1066	r.kureckova@seznam.cz
1067	r.naumann@basketballverband-sachsen.de
1068	r12baggio@yahoo.com
1069	radas.mez@gmail.com
1070	radicsbazsi@hotmail.co.uk
1071	radim.klein@centrum.cz-neposilat
1072	radka.drnkova@centrum.cz
1073	radobasket@radobasket.hu
1074	radoslavkarabin@gmail.com
1075	radovan.friedel@seznam.cz
1076	radovanhrabcak@gmail.com
1077	railroadran@hotmail.com
1078	raisanen.elias@gmail.com
1079	rakantis@gmail.com
1080	ralsta@inbox.lv
1081	ratajsky.roman@seznam.cz
1082	raul.rodriguez@albaberlin.de
1083	razutisg@gmail.com
1084	reditel@penzion-fm.cz
1085	reet.rausberg@audentes.ee
1086	refereelt@gmail.com
1087	regensburgbaskets@kumicic.de
1088	reiss-bernhard@aon.at
1089	reka@radobasket.hu
1090	rene.naumann@dresden-titans.de
1091	richard.kamensky@gmail.com
1092	ricsillakft@gmail.com
1093	riinuv@gmail.com
1094	robert.fritsch.74@gmail.com
1095	robert.landa@post.cz
1096	robige@freemail.hu
1097	robin.foniok@gmail.com
1098	rogernagel@web.de
1099	roje@centrum.cz
1100	rolo@alleyhoop.de
1101	roman.chocholous@bkstudanka.cz
1102	roman.gezo@seznam.cz
1103	roman.lang@weiden-basketball.com
1104	roman.vrabel23@gmail.com
1105	roman.wittig@web.de
1106	romprov@mail.ru
1107	ronkay.laszlo@zugloisasok.hu
1108	ronnie.ziegler@gmail.com
1109	ronny.schoenau@gmx.de
1110	rosa.basket@email.cz
1111	rosasport@rosasport.pl
1112	ross.jorgusen@porsche-bba.de
1113	rozsasgabor@yahoo.com
1114	rudolf.loescher@liwest.at
1115	rudolfpolder@aol.com
1116	Ruediger.Kley@tvbensberg.de
1117	ruffle28@gmail.com
1118	runateam@mail.com
1119	rupert-altenberger@sbg.at
1120	rwrobson@gmail.com
1121	rytina.filip@gmail.com
1122	rytis.amsiejus@gmail.com
1123	s.cimburek@seznam.cz
1124	s.filkov2015@yandex.ru
1125	sabinaa@tbf.org.tr
1126	sailer.doma@gmail.com
1127	salmetpeter@gmail.com
1128	sandor.farkas56@gmail.com
1129	sanna@meronen.net
1130	sarahwagstaff@basketballgb.com
1131	SarkaSterbova@seznam.cz
1132	sarosi.bulcsu@gmail.com
1133	sascha.proetzig@chemnitz99.de
1134	saveski_martin@hotmail.com
1135	sba@slovakbasket.sk
1136	sbkhandlova@zoznam.sk
1137	schergu@liwest.at
1138	schmid.helmut@a1.net
1139	school@bc-tsmoki.by
1140	sclaabasketball@gmail.com
1141	scmoletai@gmail.com
1142	scurto919@gmail.com
1143	sdushor-1centr@mail.ru
1144	sdushor-olimp@mail.ru
1145	sdyshor_7@mail.ru
1146	sebastian.goelz@basket-ludwigsburg.de
1147	sebastian.neuhaeuser@dresden-titans.de
1148	sebastian.waser@gmx.at
1149	secretariat.csp19basket@gmail.com
1150	secretariat@basket.dk
1151	seftrener@basketziar.sk
1152	sestrienka@lemagroup.sk
1153	sglejdurova@post.sk
1154	shacquard@ffbb.com
1155	shahriyarbc@gmail.com
1156	shako.superleague@gmail.com
1157	shalaeva.lelya@inbox.ru
1158	shatskov777@mail.ru
1159	sidneva@bckhimki.com
1160	sigitas.simkunas@gmail.com
1161	silalessm@gmail.com
1162	silpro@silpro.sk
1163	silutessm@telesat.lt
1164	silvie.laubertova@fischer.cz
1165	simon.van.rooijen@nbb.basketball.nl
1166	simona.truhlarova@synthosgroup.com
1167	simone.marafetti@gmail.com
1168	sinan_jusufi@live.com
1169	sinilga6@gmail.com
1170	siofokikosarsuli@freemail.hu
1171	sipi02@gmail.com
1172	skaldatom@seznam.cz
1173	skolimowskimarsel@gmail.com
1174	skreblin.alenka@kzs.si
1175	skvarovaradka@seznam.cz
1176	slavikjosef@email.cz
1177	slebedeva@basket.ru
1178	smorgon.sport.shkola@list.ru
1179	snekii@seznam.cz
1180	snn75@inbox.lv
1181	sobrova.michaela@seznam.cz
1182	sonja.spasovska@basketball.org.mk
1183	sophia.boleckis@tieto.com
1184	sophie.holler@googlemail.com
1185	sopronaszok@t-online.hu
1186	sopronitigrisek@mailmax.hu
1187	sotbasket@seznam.cz
1188	spaca.ing@seznam.cz
1189	spars@ventspils.lv
1190	spb-basket2001@bk.ru
1191	spordi.kool@mail.ee
1192	sport@vilkaviskis.lt
1193	sportas@lazdijai.lt
1194	sportas@moletai.lt
1195	sportas@panevezys.lt
1196	sportas@skuodas.lt
1197	sportas@varena.lt
1198	sportecip@mail.ru
1199	sportegyesulet@sek.nyme.hu
1200	sportmokykla@gmail.com
1201	sporto.centras@trakai.lt
1202	sporto.mokykla@pasvalys.lt
1203	sporto.mokykla@telesat.lt
1204	sportocentras@akmene.lt
1205	sportocentras@druskininkai.lt
1206	sportocentras3@gmail.com
1207	sportorc@plunge.lt
1208	sportunion.kufstein@aon.at
1209	sportwart@basketball-wasserburg.de
1210	sproch@tiscali.cz
1211	ssn@fip.it
1212	ssorbita@yandex.ru
1213	standamarian@seznam.cz
1214	stanislav.zlamal@valachnet.cz
1215	startostrava@seznam.cz
1216	stefan-usv@gmx.de
1217	stefan@hlustik.at
1218	steffi.lippold@huerther-bc.de
1219	steffi.seyringer@esv-staffelsee.de
1220	stepa.zdvor@seznam.cz
1221	stephan@basketball-zell.at
1222	stockova@vrata-mazel.cz
1223	stockova1978@gmail.com
1224	stovicek@vakuum.cz
1225	strapis@inbox.lv
1226	strizheus@mail.ru
1227	suster.patrik@gmail.com
1228	sylvie.koesterke@web.de
1229	szabo.tamas1910@gmail.com
1230	szolzolt@gmail.com
1231	t.holes@seznam.cz
1232	t.urbelionis@gmail.com
1233	tadeaspleva@seznam.cz
1234	tasnadizoli74@gmail.com
1235	tataisportegyesulet@gmail.com
1236	tboye@mail.dk
1237	tdokoupil@cbf.cz
1238	terhi.rauhansalo@hotmail.com
1239	th.maresch@ubi-graz.com
1240	thomas.schoenbett@cvjm-loerrach.de
1241	timo.probst@basket-ludwigsburg.de
1242	tina.schott@aon.at
1243	tlorber@web.de
1244	to.novak@centrum.cz
1245	tobbe@blackebergbasket.com
1246	tobiaswilmesmeier@yahoo.de
1247	tomas.rosecky@cooperstandard.com
1248	tomas.urbanec@centrum.cz
1249	tomas@dannax.sk
1250	tomasbesina@gmail.com
1251	tomasmacela@gmail.com
1252	tomassevera@seznam.cz
1253	tomasz.juszczyk@atlas-tours.pl
1254	tomushas@gmail.com
1255	tonidirlic@aol.com
1256	tonokret@gmail.com
1257	torok.zsofi@bdsebasket.hu
1258	tpangrac@seznam.cz
1259	trakiskis@yahoo.com
1260	treffsportcentrum@gmail.com
1261	trener@iskrapartizanske.sk
1262	trinta.ivanova@mail.ru
1263	trmariusz@op.pl
1264	truhlarova.sim@gmail.com
1265	tsrc@tsrc.lt
1266	tyurkul@aol.com
1267	u11w@sbr-basketball.de
1268	u12orga@basketball-jena.de
1269	u12w@48er-basketball.de
1270	U13-1@bbz-opladen.de
1271	u13w@48er-basketball.de
1272	u13w@sbr-basketball.de
1273	U13weiblich@djk-landsberg.de
1274	u14I@bc-darmstadt.de
1275	u14m@48er-basketball.de
1276	U14m1@djk-landsberg.de
1277	u14trainer@basketball-weinheim.de
1278	U15@bbz-opladen.de
1279	u15@bc-darmstadt.de
1280	u15w@48er-basketball.de
1281	u15w@sbr-basketball.de
1282	U15w1@djk-landsberg.de
1283	uhrovamisa@centrum.cz
1284	uigur_hus@mail.ru
1285	ujpestmt2014@gmail.com
1286	ukmsportocentras@inbox.lt
1287	uks7.perzanowski@wp.pl
1288	Ulrych18@seznam.cz
1289	unionpress@centrum.sk
1290	urban.t@seznam.cz
1291	urbani@stonline.sk
1292	urbani@urbani.sk
1293	UrbanRichard@seznam.cz
1294	uros.cebedzic@gmail.com
1295	uscbasketball.md@gmail.com
1296	usi@uni-klu.ac.at
1297	usk@seznam.cz
1298	v.evgenievski@basketballaustria.at
1299	v.taucius@panevezys.lt
1300	v.tupciauskas@gmail.com
1301	v.vyoral@email.cz
1302	vaclav.kubat2@gmail.com
1303	vaidas.muralis@gmail.com
1304	valda55@inbox.lv
1305	valdis@imsports.lv
1306	vasas.basket@gmail.com
1307	vasasferfikosar@gmail.com
1308	vekmedzic@gmail.com
1309	vera.bolte@bg-rheinstars-koeln.de
1310	verein@dragonz.at
1311	veronika.pondelickova8@seznam.cz
1312	vetorova@bckolin.cz
1313	vienna87@aon.at
1314	viera.babjakova@bdrbb.sk
1315	viirpaluandra@gmail.com
1316	vikingsbregenz@gmail.com
1317	villepekka.anttila@gmail.com
1318	vinkusik@gmail.com
1319	vitezslavpohanka@gmail.com
1320	vittorio.martini94@gmail.com
1321	vkksc@sugardas.lt
1322	vlastahavlik@email.cz
1323	vmoricka@gmail.com
1324	vojtech.cech26@seznam.cz
1325	vorstand@basketball-villach.at
1326	vorstand@bc-zwickau.de
1327	vorstand@dbbc.at
1328	votrubcova@gmail.com
1329	vs-novikov@mail.ru
1330	walter.odreitz@schule.at
1331	walter.schneeberger@btv.at
1332	webmaster@tb-basketball.de
1333	weimarbasketball@gmail.com
1334	werner.sallomon@gmx.at
1335	widz@centrum.cz
1336	wirsigova.jitka@seznam.cz
1337	wittsven@web.de
1338	wm-tbv@t-online.de
1339	wolfgang.r@gmx.at
1340	wolfram@inode.at
1341	yevgenyissakov@gmail.com
1342	ysorokin@bk.ru
1343	zabra.33.33@seznam.cz
1344	zahradnicek.ondrej.cz@gmail.com
1345	zakusaci@gmail.com
1346	zalan.meszaros@gmail.com
1347	zampi@centrum.cz
1348	zamrzla.david@seznam.cz
1349	zatrenerov@basketziar.sk
1350	zavir@centrum.cz
1351	zbigniewdusza@wp.pl
1352	zebe@seznam.cz
1353	zeman@bkloko-plzen.cz
1354	zhartun_valeriy@ukr.net
1355	zilecuca@seznam.cz
1356	zivanovic@sportsleaderagency.net
1357	zkarolova@seznam.cz
1358	zrinka.tomicic@hks-cbf.hr
1359	ztekosar@zalaszam.hu
1360	zubrys.donatas@gmail.com
1361	zuzana60@gmail.com
1362	zuzbor@hotmail.com
1363	zz39@freemail.hu
\.


--
-- Data for Name: invoice; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."invoice" ("id", "team_id", "var_symbol", "type", "paid", "issue_date", "amount") FROM stdin;
140	143	20240143	registration	f	2024-01-23	5000 czk
142	145	20240145	registration	f	2024-01-23	5000 czk
143	146	20240146	registration	f	2024-01-23	220 eur
144	147	20240147	registration	f	2024-01-23	5000 czk
145	148	20240148	registration	f	2024-01-23	220 eur
146	149	20240149	registration	f	2024-01-23	220 eur
147	150	20240150	registration	f	2024-01-23	220 eur
148	151	20240151	registration	f	2024-01-23	220 eur
149	152	20240152	registration	f	2024-01-23	220 eur
151	154	20240154	registration	f	2024-01-24	5000 czk
152	155	20240155	registration	f	2024-01-24	220 eur
153	156	20240156	registration	f	2024-01-24	5000 czk
154	157	20240157	registration	f	2024-01-24	5000 czk
155	158	20240158	registration	f	2024-01-24	5000 czk
156	159	20240159	registration	f	2024-01-24	5000 czk
157	160	20240160	registration	f	2024-01-24	220 eur
158	161	20240161	registration	f	2024-01-24	220 eur
159	162	20240162	registration	f	2024-01-24	220 eur
160	163	20240163	registration	f	2024-01-24	5000 czk
161	164	20240164	registration	f	2024-01-26	5000 czk
162	165	20240165	registration	f	2024-01-26	5000 czk
163	166	20240166	registration	f	2024-01-26	5000 czk
164	167	20240167	registration	f	2024-01-26	220 eur
\.


--
-- Data for Name: team_accomodation_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."team_accomodation_info" ("id", "team_id", "day", "role", "accomodation", "count") FROM stdin;
\.


--
-- Data for Name: team_billing_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."team_billing_info" ("id", "company_name", "address", "city", "zip_code", "ic", "dic", "team_id") FROM stdin;
141	Basket Club Benešov z.s.	Pražského povstání 1804	Benešov	25601	48925799		143
143	BA Sparta z.s.	Kuncova 1617/3	Praha 13	15500	26543656		145
144	Tus Traunreut Basketballabteilung	Traunring 116	Traunreut	83301	Ust-IdNR:DE131566822		146
145	BK Lvice Litoměřice, z.s	Sovova 709/5	Litoměřice	41201	46768955		147
146	Science City Jena e.V.	Keßlerstraße 28b	Jena	07745	162/142/09156	162/142/09156	148
147	Science City Jena e.V.	Keßlerstraße 28b	Jena	07745	162/142/09156	162/142/09156	149
148	Science City Jena e.V.	Keßlerstraße 28b	Jena	07745	162/142/09156	162/142/09156	150
149	Science City Jena e.V.	Keßlerstraße 28b	Jena	07745	162/142/09156	162/142/09156	151
150	Hessischer Basketball Verband	Schlossbergweg 4	Neuenstein	D-36286	00225003485	DE253546944	152
152	Univerzitní Sportovní Klub Praha	Na Folimance 2490/2	Praha 2	12000	\t00393495	\t00393495	154
153	ASD Virtus Verbania	via Renco 17	Verbania	28923	000000000	02158420030	155
154	BK Pelhřimov, sportovní spolek	Hodějovická 448	Pelhřimov	393 01	63893631		156
155	Basketbalové centrum mládeže Sokolov, z.s.	Chebská 53	Sokolov	356 01	62638505		157
156	Sokol Dubeč	Městská 227/2	Praha 	10700	00553638		158
157	BK Lvice Litomerice	Sovova709/5	Litoméřice	41201	46768955		159
158	Rockets	Uelleber Straße 13a	Gotha	99867	HELADEF1GTH	156/141/07860	160
159	Rockets	Uelleber Straße 13a	Gotha	99867	HELADEF1GTH	156/141/07860	161
160	Rockets	Uelleber Straße 13a	Gotha	99867	HELADEF1GTH	156/141/07860	162
161	BK Klatovy	Voříškova 715	Klatovy	33901	22850490		163
162	BK Klatovy, z.s.	Voříškova 715	Klatovy	339 01	22850490		164
163	Slavoj BK Litoměřice 	Vrchlického	Litoměřice 	41201	27009441		165
164	Basket Club Benešov z.s.	Pražského povstání 1804	Benešov	25601	48925799		166
165	Freak City Bamberg e.V.	Kornstraße 20	Bamberg	96050	20710830275		167
\.


--
-- Data for Name: team_room_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."team_room_info" ("id", "team_id", "day", "role", "room_type", "count") FROM stdin;
\.


--
-- Data for Name: team_transport_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."team_transport_info" ("id", "arrival_time", "arrival_date", "means_of_transport", "will_transport_stay_over", "will_need_transport_from_airport", "flight_number", "place_of_landing", "team_id") FROM stdin;
141	12:30	2024-03-27	train	f	f	\N	\N	143
143	18:00	2024-03-26	car	t	f	\N	\N	145
144	13:30	2024-03-28	car	f	f	\N	\N	146
145	18:00	2024-03-27	car	t	f	\N	\N	147
146	19:00	2024-03-26	bus	f	f	\N	\N	148
147	19:00	2024-03-26	bus	f	f	\N	\N	149
148	19:00	2024-03-26	bus	f	f	\N	\N	150
149	19:00	2024-03-26	bus	f	f	\N	\N	151
150	14:30	2024-03-26	car	t	f	\N	\N	152
152		2024-03-28	car	t	f	\N	\N	154
153	21:00	2024-03-26	car	t	f	\N	\N	155
154	10:00	2024-03-28	car	t	f	\N	\N	156
155	10:30	2024-03-28	car	t	f	\N	\N	157
156	10:30	2024-03-28	train	f	f	\N	\N	158
157	14:00	2024-03-27	car	t	f	\N	\N	159
158	07:00	2024-03-26	car	t	f	\N	\N	160
159	07:00	2024-03-26	car	f	f	\N	\N	161
160	07:00	2024-03-26	car	f	f	\N	\N	162
161		2024-03-28	train	f	f	\N	\N	163
162		2024-03-28	car	f	f	\N	\N	164
163	11:00	2024-03-28	car	t	f	\N	\N	165
164	17:00	2024-03-28	train	f	f	\N	\N	166
165		2024-03-28	car	t	f	\N	\N	167
\.


--
-- Data for Name: tshirt_orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."tshirt_orders" ("id", "team_id", "no_xs_shirts", "no_s_shirts", "no_m_shirts", "no_l_shirts", "no_xl_shirts", "no_xxl_shirts") FROM stdin;
93	143	0	1	12	2	0	3
95	145	1	0	14	2	0	0
96	152	0	6	6	1	0	0
98	155	0	0	0	5	7	3
99	156	0	1	6	3	4	0
100	157	0	2	5	5	1	0
101	163	0	4	4	3	0	1
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") FROM stdin;
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id") FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY "vault"."secrets" ("id", "name", "description", "secret", "key_id", "nonce", "created_at", "updated_at") FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: postgres
--

SELECT pg_catalog.setval('"drizzle"."__drizzle_migrations_id_seq"', 1, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: catering_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."catering_order_id_seq"', 126, true);


--
-- Name: email_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."email_list_id_seq"', 1364, true);


--
-- Name: invoice_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."invoice_id_seq"', 165, true);


--
-- Name: team_accommodation_info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."team_accommodation_info_id_seq"', 101, true);


--
-- Name: team_billing_info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."team_billing_info_id_seq"', 166, true);


--
-- Name: team_room_info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."team_room_info_id_seq"', 48, true);


--
-- Name: team_transport_info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."team_transport_info_id_seq"', 166, true);


--
-- Name: teams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."teams_id_seq"', 168, true);


--
-- Name: tshirt_orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."tshirt_orders_id_seq"', 101, true);


--
-- PostgreSQL database dump complete
--

RESET ALL;
